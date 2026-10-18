# CapchAI — AI image prompts

Three prompts per category, matched to the real photos already curated in
`data/real-images.json`, so that in any 2x2 round the odd image out is not
obvious from subject matter alone.

## How to generate

- **Aspect ratio 1:1**, at least 1024x1024. The game crops everything square.
- **Photorealistic, not "AI-pretty".** The goal is a fair fight. Avoid the
  tell-tale glossy, hyper-saturated, perfectly symmetrical look. If your tool
  has a "raw" or "natural" style, use it.
- **No text, watermarks, logos or borders** unless the prompt asks for signage.
- **Mix models** if you can (Midjourney, Flux, Imagen, DALL-E, Ideogram). One
  model's fingerprint across 30 images becomes a learnable tell.
- **Save as JPEG** at `assets/ai/<category>-<n>.jpg`, for example
  `assets/ai/portrait-1.jpg`. The game manifest keys on those filenames.
- Deliberately leave a few subtle flaws in. The round-end "tell" text in the
  game points at things like hands, text, reflections and background logic.

Suffix to append to every prompt below if your tool benefits from it:

> shot on a consumer DSLR, natural lighting, slight sensor noise, no retouching,
> candid, imperfect framing, realistic skin and texture, no text, no watermark

---

## 1. portrait

Real set: a woman in a dark headwrap in profile with hoop earrings; a redhead
in a black top outdoors at dusk; a close-up of a young girl's face; a woman
with an updo against green foliage; a smiling East Asian woman in soft light.

- `portrait-1`: Candid head-and-shoulders portrait of a woman in her thirties
  with freckles and shoulder-length auburn hair, slightly off-centre, soft
  overcast daylight, blurred city street behind her, neutral expression.
- `portrait-2`: Close-up portrait of an older man with a grey beard and
  weathered skin, wearing a wool cap, warm window light from the left, dark
  background, looking just past the camera.
- `portrait-3`: Profile portrait of a young Black woman with short natural
  hair and small gold earrings, warm golden-hour light, out-of-focus park
  foliage behind, calm expression.

## 2. hands

Real set: two hands clasped with one wearing a watch; hands gently cupped
together; a couple holding hands on a street; a hand holding a bunch of green
grapes; an elderly hand holding red roses.

- `hands-1`: Close-up of two people's hands clasped together on a wooden café
  table, one wearing a thin silver ring, shallow depth of field, soft daylight.
- `hands-2`: A hand holding a ripe peach against a plain light background,
  fingers naturally curled, visible fine hairs and skin creases, overhead
  natural light.
- `hands-3`: Elderly hands knitting with grey wool, viewed from above, lap and
  patterned blanket visible, warm indoor light, slightly grainy.

## 3. food

Real set: a grilled salmon fillet on greens with cherry tomatoes; a ramen bowl
on a wooden counter; stir-fried shrimp noodles with vegetables; a plated
white-tablecloth dish with a fork; a bowl of blueberries.

- `food-1`: A plate of pan-seared chicken thigh on roasted vegetables with a
  drizzle of sauce, white ceramic plate, dark wooden table, overhead shot,
  restaurant lighting.
- `food-2`: A bowl of pho with sliced beef, bean sprouts, basil and a lime
  wedge, steam rising, chopsticks resting on the bowl, 45-degree angle, warm
  diner light.
- `food-3`: A slice of blueberry cheesecake on a small plate with a fork,
  crumbs on the plate, café table, side window light, slightly cluttered
  background.

## 4. landscape

Real set: a snowy mountain over a still lake; a rocky lakeshore with a
boulder; an autumn river gorge; a Canadian glacial lake in a valley; a
turquoise alpine lake from above.

- `landscape-1`: A calm alpine lake at dawn reflecting a snow-capped peak,
  pine forest on the far shore, thin mist on the water, muted colours, wide
  angle.
- `landscape-2`: A rocky river valley in autumn with orange larch trees and
  low grey clouds, wet stones in the foreground, overcast daylight.
- `landscape-3`: A turquoise glacial lake seen from a high ridge, scree
  slopes, patches of old snow, bright midday sun, slight haze.

## 5. architecture

Real set: a white apartment block with stacked balconies; a brick-and-glass
modern tower against blue sky; a glass skyscraper framed by trees; a colourful
orange-and-grey housing block; a white minimalist museum building.

- `architecture-1`: Modern apartment building with staggered white concrete
  balconies, shot from the street looking up, clear blue sky, a few plants on
  the balconies.
- `architecture-2`: A glass office tower reflecting clouds, with the lower
  floors partly hidden by street trees, late afternoon, photographed from the
  opposite sidewalk.
- `architecture-3`: A brutalist concrete library with narrow vertical windows,
  overcast sky, a cyclist passing in front, slightly tilted framing.

## 6. pets

Real set: a black Labrador sitting on grass; an orange-and-white cat looking
up; a tabby cat close-up with wide eyes; a husky with its mouth open; a small
fluffy white-and-tan dog on a deck.

- `pets-1`: A golden retriever sitting on a lawn with its tongue out, slightly
  muddy paws, collar with a tag, overcast daylight, shot at dog's eye level.
- `pets-2`: A grey tabby cat on a windowsill looking out, whiskers backlit,
  slightly dusty window, indoor shot with a messy background.
- `pets-3`: A scruffy small terrier mix on a wooden deck, head tilted, one ear
  flopped, harsh midday sun with hard shadows.

## 7. interior

Real set: a classic living room with fireplace and bookshelves; a grey sofa
with patterned cushions and a side table; a teal sofa with white cushions by a
window; a leather armchair by a fireplace with a piano; a bright living room
with a black sofa and gallery wall.

- `interior-1`: A lived-in living room with a grey fabric sofa, mismatched
  cushions, a coffee table with magazines and a mug, afternoon light through
  sheer curtains, wide shot.
- `interior-2`: A small reading corner with a worn leather armchair, floor
  lamp, stacked books on the floor and a radiator under the window, warm
  evening light.
- `interior-3`: A bright Scandinavian-style living room with a light wood
  floor, white walls, a plant in the corner and a framed print slightly
  crooked, overcast window light.

## 8. product

Real set: an espresso in a white cup on a saucer; a cappuccino in a white cup;
a latte with a spoon on a white saucer; a stainless steel moka pot; a latte
with heart-shaped art on a wooden table.

- `product-1`: A white ceramic cup of cappuccino with uneven foam on a saucer,
  on a scratched wooden café table, a sugar packet beside it, window light.
- `product-2`: A stainless steel moka pot on a gas stove, slight coffee stains
  on the stovetop, kitchen tiles behind, daylight from the side.
- `product-3`: A takeaway paper coffee cup with a plain brown sleeve and a
  white lid on a park bench, condensation, blurred greenery behind.

## 9. signage

Real set: the Starlite West Motel neon sign; the Mom's Diner red neon sign; a
"24 HOURS" red neon circle; a yellow "DISCO" lit sign on a building; a "BAR
BAR" neon sign in blue and yellow.

- `signage-1`: A vintage roadside motel neon sign reading "SUNSET MOTEL" with
  "VACANCY" below, dusk sky, one letter flickering out, power lines overhead.
- `signage-2`: A red neon sign in a diner window reading "OPEN 24 HRS",
  reflections of the street in the glass, night, slightly grainy.
- `signage-3`: A hand-painted shop sign above a bakery reading "CORNER
  BAKERY" in faded cream letters on dark green, brick wall, daytime.

## 10. street

Real set: yellow taxis in a Manhattan intersection; pedestrians on a sunlit
European shopping street; a crosswalk with a car and walkers; a woman crossing
a street in a city; a historic Japanese street with wooden buildings.

- `street-1`: A busy city crosswalk at rush hour with people mid-stride, a
  bus passing, overcast light, shot from hip height, slight motion blur.
- `street-2`: A narrow old-town street with cobblestones, café chairs on one
  side, a few tourists walking away from the camera, afternoon shadows.
- `street-3`: A quiet residential street with parked cars, a cyclist, autumn
  leaves on the pavement and a corner shop with its lights on, early evening.

## 11. art (still life and landscape painting)

Real set: Renoir's still life with peaches; a Fantin-Latour flower still life;
a Pissarro still life with apples and a jug; Cézanne's apples; a Gauguin
landscape with figures.

- `art-1`: Oil painting in the style of a late 19th-century French still life,
  a bowl of peaches and a glass on a white cloth, loose brushwork, warm
  palette, visible canvas texture, slightly uneven varnish.
- `art-2`: Impressionist oil painting of a riverbank with poplars and two
  figures in the distance, broken colour, soft light, aged craquelure visible.
- `art-3`: Post-impressionist oil still life of a blue jug with pears on a
  tilted tabletop, flattened perspective, thick impasto, muted earthy colours.

---

## Checklist before handing back

- 33 files total (11 categories x 3), all square JPEGs
- named `assets/ai/<category>-<n>.jpg`
- no text in images except the three signage prompts
- a note of which model made each one, in `assets/ai/models.txt`, so the game
  can show it on the results screen
