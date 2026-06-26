# Touch + Infinite Scroll Plan

## Status

- [x] Touch drag fix
- [x] Infinite scroll

---

## Part 1 — Touch drag fix (pending)

### What is wrong

`attachPointerEvents()` has a `(pointer: fine)` guard — touch devices (`pointer: coarse`) are excluded entirely from JS drag handling. They fall back to CSS `scroll-snap-type: x mandatory` only, which is flaky on some Android browsers and older iOS Safari.

### What needs to change

**[main/src/lib/main.ts](main/src/lib/main.ts)**

- Remove the `(pointer: fine)` guard — pointer events attach on all devices
- Add `{ passive: false }` to `pointermove` listener — required for `e.preventDefault()` to actually suppress native scroll on mobile (browsers default touch listeners to passive, silently ignoring `preventDefault()` otherwise)

**[main/src/style.css](main/src/style.css)**

- Add `touch-action: pan-y` — tells the browser to handle vertical swipes natively (page scroll) but hand horizontal swipes to JS. Without this, the browser races JS to start a native horizontal scroll before `pointerdown` can set up capture.

### How physics will work (same for mouse and touch)

Velocity is tracked in px/ms during drag. On release:

```
momentumTime = clamp(100 + sqrt(|velocity|) * 50, max=200ms)
momentum     = velocity * momentumTime
target       = currentScrollLeft + momentum
snapTo       = nearestSnapPoint(target)
```

- Slow swipe → near-zero momentum → snaps to nearest item from current position
- Fast swipe → up to 200ms × velocity worth of pixels → can skip multiple items

---

## Part 2 — Infinite scroll

### Approach: clone buffer

Append clones of the first N items after the last real item.  
Prepend clones of the last N items before the first real item.

```
[ clone(last-N..last) | item0 | item1 | ... | itemLast | clone(0..N-1) ]
                        ^— real start                   ^— real end
```

After the animation lands on a clone, silently set `scrollLeft` to the pixel-equivalent real position (no visual jump since the clone is pixel-identical).

**N = max items skippable by a fast fling.**  
With momentum capped at 200ms and typical item widths ~300–400px, a fast fling at ~10px/ms projects ~2000px. At 300px/item that's ~6 items. N = 8 is a safe buffer.  
N should be computed at runtime: `ceil(maxMomentum / minItemWidth)` or just `visibleColumns * 2`.

### Changes required

**DOM**

- `buildClones()` — creates N clone nodes on each side, marks them `data-motionrail-clone`
- Called from `constructor` (if `infinite: true`) and `update()`
- Clones are real DOM nodes (deep clones), so they render identically
- On `destroy()`, remove clones and restore DOM

**Scroll init**

- After clones are inserted, set `scrollLeft` to the real item 0 position (skipping the prepended clones) — so the carousel starts at item 0 visually

**`cacheSnapPoints()`**

- Currently maps all items to their `offsetLeft`
- With clones: still maps all nodes, but tags each point as real or clone
- Clone snap points are needed for physics to land correctly; teleport happens after

**`findNearestSnapPoint()`**

- No change needed — it can land on a clone point; teleport corrects it after

**After-animation teleport**

- In `onScrollEnd` (the callback passed to `animateLogicalScroll`): check if current `scrollLeft` is in the clone zone
- If yes: compute the equivalent real position and set `scrollLeft` instantly (no animation)
- This must happen before re-enabling `scroll-snap-type`

**`scrollByPage()` (next/prev buttons, autoplay)**

- Currently wraps by snapping back to index 0 with `scrollTo({ behavior: 'smooth' })` — visible scroll-back across the whole carousel
- Replace with: scroll to the clone on the other side, let it land, then teleport — same seamless feel as drag

**State (`visibleItemIndexes`)**

- Clone nodes must not appear in public state
- `IntersectionObserver` should observe only real items (filter by `data-motionrail-clone` absence)
- `totalItems` stays the real count

**Options**

- `infinite: boolean` — opt-in, default `false`
- No other new options needed

### Implementation order

1. Add `infinite` to `MotionRailOptions` type
2. `buildClones(n)` — insert clone nodes, return the scroll offset to real item 0
3. Adjust `constructor` to call `buildClones` and set initial `scrollLeft`
4. Update `cacheSnapPoints` to handle clone offsets
5. Add teleport check in `onScrollEnd`
6. Update `scrollByPage` to route through clones instead of index 0
7. Update `observeEdgeItems` to skip clone nodes
8. Update `update()` and `destroy()` to rebuild/remove clones
9. Update framework wrappers (React, Vue, Svelte, etc.) to pass `infinite` through

### What this does NOT change

- Physics / velocity math — unchanged
- The snap point animation — unchanged
- RTL support — clone logic mirrors the same way (prepend/append just swap sides)
- The `(pointer: fine)` removal — already done, works the same for infinite

---

## Open questions

- **N (clone buffer size)**: hardcode 8, or compute from item width at runtime? Runtime is more correct but adds complexity. Start with `visibleColumns * 2`, recompute in `observeResize`.
- **autoplay + infinite**: `scrollByPage(1)` at the last real item should go to the clone, then teleport. Needs a short delay between animation end and teleport so the snap feels clean.
- **Gap between clone and real item**: clones are inserted as siblings so CSS grid gap applies. Should be seamless.
