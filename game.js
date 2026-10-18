/* CapchAI — spot the machine. Plain JS, no build step. */
(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const screens = { start: $('#screen-start'), round: $('#screen-round'), results: $('#screen-results') };

  const POINTS_CORRECT = 100;
  const TIME_BONUS_MAX = 50;      // full bonus if answered instantly, fades to 0 at TIME_BONUS_WINDOW
  const TIME_BONUS_WINDOW = 12;   // seconds
  const STREAK_BONUS = 25;        // per consecutive correct beyond the first

  let manifest = null;
  let game = null;

  // ---------- helpers ----------
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr, n) => shuffle(arr).slice(0, n);
  const show = (name) => { Object.values(screens).forEach(s => s.classList.remove('active')); screens[name].classList.add('active'); window.scrollTo(0, 0); };
  const fmt = (s) => s.toFixed(1) + 's';
  const toast = (msg) => { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => { t.hidden = true; }, 1800); };

  // ---------- game setup ----------
  function buildRounds() {
    const cats = pick(manifest.categories, Math.min(manifest.rounds, manifest.categories.length));
    // balanced directions: half "find the AI", half "find the real", shuffled
    const dirs = shuffle(cats.map((_, i) => (i % 2 === 0 ? 'ai' : 'real')));
    return cats.map((cat, i) => {
      const dir = dirs[i];
      const reals = pick(cat.real, dir === 'ai' ? 3 : 1).map(x => ({ ...x, kind: 'real' }));
      const ais = pick(cat.ai, dir === 'ai' ? 1 : 3).map(x => ({ ...x, kind: 'ai' }));
      const tiles = shuffle(reals.concat(ais));
      const answer = tiles.findIndex(t => t.kind === dir);
      return { cat, dir, tiles, answer, picked: null, correct: null, seconds: 0 };
    });
  }

  function startGame() {
    game = { rounds: buildRounds(), index: 0, score: 0, streak: 0, best: 0 };
    show('round');
    renderRound();
  }

  // ---------- round ----------
  let timerId = null, roundStart = 0, selected = null;

  function renderRound() {
    const r = game.rounds[game.index];
    selected = null;
    $('#head-target').textContent = r.dir === 'ai' ? 'AI-generated image' : 'only real photo';
    $('#head-cat').textContent = r.cat.label;
    $('#head-round').textContent = `${game.index + 1} / ${game.rounds.length}`;
    $('#feedback').hidden = true;
    $('#btn-verify').hidden = false; $('#btn-verify').disabled = true;
    $('#btn-next').hidden = true;
    $('#streak').hidden = game.streak < 2;
    $('#streak').textContent = `streak x${game.streak}`;

    const grid = $('#grid'); grid.innerHTML = '';
    r.tiles.forEach((t, i) => {
      const b = document.createElement('button');
      b.className = 'tile'; b.type = 'button'; b.dataset.i = i; b.setAttribute('aria-label', `Image ${i + 1}`);
      const img = document.createElement('img'); img.src = t.src; img.alt = ''; img.draggable = false;
      img.onerror = () => { b.classList.add('missing'); img.remove(); const ph = document.createElement('div'); ph.className = 'ph'; ph.textContent = 'AI image pending\n' + t.src.split('/').pop(); b.prepend(ph); };
      b.appendChild(img);
      b.insertAdjacentHTML('beforeend', `<span class="num">${i + 1}</span><span class="check"></span><span class="tag">${t.kind === 'ai' ? 'AI' : 'REAL'}</span>`);
      b.addEventListener('click', () => select(i));
      grid.appendChild(b);
    });

    roundStart = performance.now();
    clearInterval(timerId);
    timerId = setInterval(() => { $('#timer').textContent = fmt((performance.now() - roundStart) / 1000); }, 100);
  }

  function select(i) {
    if (game.rounds[game.index].picked !== null) return;
    selected = i;
    document.querySelectorAll('.tile').forEach(t => t.classList.toggle('selected', +t.dataset.i === i));
    $('#btn-verify').disabled = false;
  }

  function verify() {
    const r = game.rounds[game.index];
    if (selected === null || r.picked !== null) return;
    clearInterval(timerId);
    r.seconds = (performance.now() - roundStart) / 1000;
    r.picked = selected;
    r.correct = selected === r.answer;

    let gained = 0;
    if (r.correct) {
      game.streak += 1; game.best = Math.max(game.best, game.streak);
      gained = POINTS_CORRECT + Math.round(TIME_BONUS_MAX * Math.max(0, 1 - r.seconds / TIME_BONUS_WINDOW));
      if (game.streak > 1) gained += STREAK_BONUS * (game.streak - 1);
    } else {
      game.streak = 0;
    }
    game.score += gained;

    document.querySelectorAll('.tile').forEach(t => {
      const i = +t.dataset.i; t.classList.add('reveal', r.tiles[i].kind === 'ai' ? 'is-ai' : 'is-real');
      if (i === r.answer) t.classList.add('answer');
      if (i === r.picked && !r.correct) t.classList.add('wrong-pick');
    });
    const fb = $('#fb-result');
    fb.className = 'fb-result ' + (r.correct ? 'ok' : 'bad');
    fb.textContent = r.correct ? `Correct. +${gained}` : `Wrong. Image ${r.answer + 1} was the ${r.dir === 'ai' ? 'AI one' : 'real one'}.`;
    $('#fb-tell').textContent = r.cat.tell;
    $('#feedback').hidden = false;
    $('#btn-verify').hidden = true;
    $('#btn-next').hidden = false; $('#btn-next').focus();
    $('#btn-next').textContent = game.index + 1 >= game.rounds.length ? 'See results' : 'Next';
  }

  function next() {
    if (game.rounds[game.index].picked === null) return;
    game.index += 1;
    if (game.index >= game.rounds.length) return renderResults();
    renderRound();
  }

  // ---------- results ----------
  function verdict(correct, total) {
    const p = correct / total;
    if (p === 1) return ['suspiciously perfect', 'Nobody gets them all. Are you sure you\'re not a bot?'];
    if (p >= 0.8) return ['certified human', 'You can still tell. Enjoy it while it lasts.'];
    if (p >= 0.6) return ['mostly human', 'Decent instincts, but the machines are gaining on you.'];
    if (p >= 0.4) return ['inconclusive', 'That\'s a coin flip. The machines would like a word.'];
    return ['failed', 'Verification failed. Please try again, human. If you are one.'];
  }

  function renderResults() {
    const rounds = game.rounds, total = rounds.length;
    const correct = rounds.filter(r => r.correct).length;
    const avg = rounds.reduce((s, r) => s + r.seconds, 0) / total;
    const [title, line] = verdict(correct, total);
    $('#res-verdict').textContent = title;
    $('#res-pct').textContent = Math.round(100 * correct / total) + '%';
    $('#res-line').textContent = line;
    $('#res-correct').textContent = `${correct}/${total}`;
    $('#res-score').textContent = game.score;
    $('#res-time').textContent = fmt(avg);

    const list = $('#res-rounds'); list.innerHTML = '';
    rounds.forEach(r => {
      const t = r.tiles[r.answer];
      const li = document.createElement('li'); li.className = r.correct ? 'ok' : 'bad';
      li.title = `${r.cat.label}: ${r.correct ? 'correct' : 'wrong'} (${fmt(r.seconds)})`;
      const img = document.createElement('img'); img.src = t.src; img.alt = '';
      img.onerror = () => { img.remove(); li.classList.add('missing'); };
      li.appendChild(img);
      list.appendChild(li);
    });

    const credits = $('#credits'); credits.innerHTML = '';
    const seen = new Set();
    rounds.forEach(r => r.tiles.filter(t => t.kind === 'real').forEach(t => {
      if (seen.has(t.src)) return; seen.add(t.src);
      const li = document.createElement('li');
      const who = t.creator ? ` by ${t.creator}` : '';
      li.innerHTML = `<a href="${t.page}" target="_blank" rel="noopener">${t.title || t.src.split('/').pop()}</a>${who}, ${t.license}`;
      credits.appendChild(li);
    }));
    const models = [...new Set(rounds.flatMap(r => r.tiles.filter(t => t.kind === 'ai' && t.model).map(t => t.model)))];
    if (models.length) { const li = document.createElement('li'); li.textContent = `AI images generated with ${models.join(', ')}.`; credits.appendChild(li); }

    game.shareText = `CapchAI: ${correct}/${total} — ${Math.round(100 * correct / total)}% human (${game.score} pts)\n` +
      rounds.map(r => r.correct ? '🟩' : '🟥').join('') + '\nCan you spot the machine?';
    show('results');
  }

  // ---------- wiring ----------
  function startFromCheckbox() {
    const box = $('#start-check');
    if (box.classList.contains('loading')) return;
    box.classList.add('loading');
    setTimeout(() => { box.classList.remove('loading'); box.classList.add('done'); }, 900);
    setTimeout(() => { box.classList.remove('done'); startGame(); }, 1400);
  }
  $('#start-box').addEventListener('click', startFromCheckbox);
  $('#start-box').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startFromCheckbox(); } });
  $('#btn-verify').addEventListener('click', verify);
  $('#btn-next').addEventListener('click', next);
  $('#btn-again').addEventListener('click', startGame);
  $('#btn-share').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(game.shareText); toast('Copied to clipboard'); }
    catch { toast('Could not copy. Select and copy manually: ' + game.shareText); }
  });
  document.addEventListener('keydown', (e) => {
    if (!screens.round.classList.contains('active')) return;
    if (e.key >= '1' && e.key <= '4') select(+e.key - 1);
    if (e.key === 'Enter') { e.preventDefault(); if (!$('#btn-next').hidden) next(); else verify(); }
  });

  fetch('data/manifest.json?v=' + Date.now(), { cache: 'no-store' }).then(r => r.json()).then(m => { manifest = m; })
    .catch(() => { $('#start-box').style.opacity = .5; $('.hint').textContent = 'Could not load data/manifest.json. Serve this folder over HTTP.'; });
})();
