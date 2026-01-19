# SSR & FOUC-Free Styling

MotionRail provides a robust approach to ensure your carousels render correctly and instantly styled, both during server-side rendering (SSR) and on the client. This prevents the common web issue known as FOUC (Flash of Unstyled Content), where users briefly see unstyled or broken layouts before CSS is applied.

## Why FOUC Happens

FOUC occurs when the browser displays content before the necessary styles are loaded or applied. In SSR and modern JavaScript frameworks, this can be especially problematic for dynamic layouts like carousels, where grid columns, gaps, and responsive breakpoints are critical for correct appearance.

## MotionRail’s Solution

MotionRail exposes a static utility, `getBreakPoints`, which generates both a unique container name and the required container query CSS for your carousel’s breakpoints. By calling this method during SSR (or at the top of your component), you can inject the exact CSS needed for your carousel’s layout before the page is rendered.

**Example usage:**

```tsx
const { containerName, containerQueries } = MotionRailClass.getBreakPoints(
	[
		{ columns: 1, gap: "16px" },
		{ width: 768, columns: 2, gap: "16px" },
		{ width: 1024, columns: 3, gap: "20px" },
	],
	8
);

// In your component render:
<style data-motionrail-style={containerName}>
	{containerQueries}
</style>
<MotionRail options={{ breakpoints, containerName }}>
	{/* ...carousel items... */}
</MotionRail>
```

## Benefits

- **No FOUC:** Styles are present on first render, so users never see an unstyled carousel.
- **SSR-Ready:** Works seamlessly with server-rendered frameworks (Next.js, Nuxt, etc.).
- **Scoped Styles:** Each carousel instance gets a unique container name, preventing style collisions.
- **Responsive:** Container queries ensure correct columns and gaps at every breakpoint.

## When to Use

- Any time you use MotionRail in an SSR context.
- When you want to guarantee a polished, flicker-free user experience.

This page is reserved for documentation about SSR (Server-Side Rendering) configuration for MotionRail.

> Details and instructions for SSR setup will be added here.
