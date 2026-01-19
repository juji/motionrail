import { MotionRail } from "motionrail";
import "motionrail/style.css";

// Carousel 1: Basic
(window as any).carousel1 = new MotionRail(
  document.getElementById("carousel1")!,
  {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
      { width: 1024, columns: 3, gap: "20px" },
    ],
    autoplay: false,
    delay: 3000,
    containerName: "motion-rail-6hbdre1q4",
    onChange(par) {
      console.log("Carousel 1 Changed:", par);
    },
  },
);

// Carousel 1 RTL: Basic RTL
(window as any).carousel1rtl = new MotionRail(
  document.getElementById("carousel1rtl")!,
  {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
      { width: 1024, columns: 3, gap: "20px" },
    ],
    autoplay: false,
    rtl: true,
    delay: 3000,
  },
);

// Carousel 2: with autoplay
(window as any).carousel2 = new MotionRail(
  document.getElementById("carousel2")!,
  {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
      { width: 1024, columns: 3, gap: "20px" },
    ],
    autoplay: true,
    delay: 2500,
  },
);

// Carousel 2 RTL: Autoplay RTL
(window as any).carousel2rtl = new MotionRail(
  document.getElementById("carousel2rtl")!,
  {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
      { width: 1024, columns: 3, gap: "20px" },
    ],
    autoplay: true,
    rtl: true,
    delay: 2500,
  },
);

// Carousel 3: Variable columns
(window as any).carousel3 = new MotionRail(
  document.getElementById("carousel3")!,
  {
    breakpoints: [
      { columns: 1, gap: "12px" },
      { width: 480, columns: 2, gap: "16px" },
      { width: 768, columns: 3, gap: "20px" },
      { width: 1024, columns: 4, gap: "24px" },
    ],
    autoplay: false,
  },
);

// Carousel 3 RTL: Variable columns RTL
(window as any).carousel3rtl = new MotionRail(
  document.getElementById("carousel3rtl")!,
  {
    breakpoints: [
      { columns: 1, gap: "12px" },
      { width: 480, columns: 2, gap: "16px" },
      { width: 768, columns: 3, gap: "20px" },
      { width: 1024, columns: 4, gap: "24px" },
    ],
    autoplay: false,
    rtl: true,
  },
);

// Carousel 4: Single breakpoint (no responsiveness)
(window as any).carousel4 = new MotionRail(
  document.getElementById("carousel4")!,
  {
    breakpoints: [{ columns: 2, gap: "20px" }],
    autoplay: false,
  },
);

// Carousel 4 RTL: Single breakpoint RTL
(window as any).carousel4rtl = new MotionRail(
  document.getElementById("carousel4rtl")!,
  {
    breakpoints: [{ columns: 2, gap: "20px" }],
    autoplay: false,
    rtl: true,
  },
);

// Carousel 5: Single item
(window as any).carousel5 = new MotionRail(
  document.getElementById("carousel5")!,
  {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
    ],
    autoplay: false,
  },
);

// Carousel 6: Two items
(window as any).carousel6 = new MotionRail(
  document.getElementById("carousel6")!,
  {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
    ],
    autoplay: false,
  },
);

// Carousel 7: Fewer items than columns
(window as any).carousel7 = new MotionRail(
  document.getElementById("carousel7")!,
  {
    breakpoints: [
      { columns: 1, gap: "12px" },
      { width: 480, columns: 2, gap: "16px" },
      { width: 768, columns: 3, gap: "20px" },
      { width: 1024, columns: 4, gap: "24px" },
    ],
    autoplay: false,
  },
);

// Carousel 8: No breakpoints (uses default)
(window as any).carousel8 = new MotionRail(
  document.getElementById("carousel8")!,
  {
    autoplay: false,
  },
);

// Carousel 9: Many items
(window as any).carousel9 = new MotionRail(
  document.getElementById("carousel9")!,
  {
    breakpoints: [
      { columns: 2, gap: "16px" },
      { width: 768, columns: 3, gap: "16px" },
      { width: 1024, columns: 4, gap: "20px" },
    ],
    autoplay: false,
    onChange: (state) => {
      console.log("Carousel 9 state:", state);
    },
  },
);

// Carousel 10: Empty carousel
(window as any).carousel10 = new MotionRail(
  document.getElementById("carousel10")!,
  {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
    ],
    autoplay: false,
  },
);

// Carousel 11: Extremely narrow
(window as any).carousel11 = new MotionRail(
  document.getElementById("carousel11")!,
  {
    breakpoints: [{ columns: 1, gap: "8px" }],
    autoplay: false,
  },
);

// Carousel 12: Massive gap
(window as any).carousel12 = new MotionRail(
  document.getElementById("carousel12")!,
  {
    breakpoints: [{ columns: 2, gap: "500px" }],
    autoplay: false,
  },
);

// Carousel 13: Dynamic content
(window as any).carousel13 = new MotionRail(
  document.getElementById("carousel13")!,
  {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
    ],
    autoplay: false,
  },
);

let itemCounter = 4;
(window as any).addItemToCarousel13 = function addItemToCarousel13() {
  const grid = document.getElementById("carousel13-grid")!;
  const newItem = document.createElement("div");
  newItem.className = "motion-rail-item";
  newItem.textContent = String(itemCounter++);
  grid.appendChild(newItem);
  (window as any).carousel13.update();
  console.log("Added item. Total items:", grid.children.length);
};

(window as any).removeItemFromCarousel13 = function removeItemFromCarousel13() {
  const grid = document.getElementById("carousel13-grid")!;
  if (grid.children.length > 0) {
    grid.removeChild(grid.lastChild!);
    (window as any).carousel13.update();
    console.log("Removed item. Total items:", grid.children.length);
  }
};

// Carousel 14: Initially hidden
(window as any).carousel14 = new MotionRail(
  document.getElementById("carousel14")!,
  {
    breakpoints: [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
    ],
    autoplay: false,
  },
);

// Carousel 15: Rapid clicking
(window as any).carousel15 = new MotionRail(
  document.getElementById("carousel15")!,
  {
    breakpoints: [{ columns: 2, gap: "16px" }],
    autoplay: false,
  },
);

(window as any).rapidClickTest = function rapidClickTest() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => (window as any).carousel15.next(), i * 50);
  }
};

// Carousel 16: Extreme column count
(window as any).carousel16 = new MotionRail(
  document.getElementById("carousel16")!,
  {
    breakpoints: [{ columns: 20, gap: "10px" }],
    autoplay: false,
  },
);
