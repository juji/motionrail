import { Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";
import { VistaViewLightbox } from "motionrail/extensions/vistaview";
import "motionrail/style.css";
import "vistaview/style.css";
import Nav from "~/components/Nav";
import { For } from "solid-js";

const MotionRail = clientOnly(() =>
  import("motionrail/solid").then((m) => ({ default: m.MotionRail })),
);

const images = [
  {
    src: "https://picsum.photos/seed/sv1/800/600",
    thumb: "https://picsum.photos/seed/sv1/400/300",
    alt: "Photo 1",
  },
  {
    src: "https://picsum.photos/seed/sv2/800/600",
    thumb: "https://picsum.photos/seed/sv2/400/300",
    alt: "Photo 2",
  },
  {
    src: "https://picsum.photos/seed/sv3/800/600",
    thumb: "https://picsum.photos/seed/sv3/400/300",
    alt: "Photo 3",
  },
  {
    src: "https://picsum.photos/seed/sv4/800/600",
    thumb: "https://picsum.photos/seed/sv4/400/300",
    alt: "Photo 4",
  },
  {
    src: "https://picsum.photos/seed/sv5/800/600",
    thumb: "https://picsum.photos/seed/sv5/400/300",
    alt: "Photo 5",
  },
  {
    src: "https://picsum.photos/seed/sv6/800/600",
    thumb: "https://picsum.photos/seed/sv6/400/300",
    alt: "Photo 6",
  },
  {
    src: "https://picsum.photos/seed/sv7/800/600",
    thumb: "https://picsum.photos/seed/sv7/400/300",
    alt: "Photo 7",
  },
  {
    src: "https://picsum.photos/seed/sv8/800/600",
    thumb: "https://picsum.photos/seed/sv8/400/300",
    alt: "Photo 8",
  },
];

export default function VistaviewPage() {
  return (
    <div
      style={{
        padding: "40px",
        background: "#000",
        color: "#eaeaea",
        "min-height": "100vh",
      }}
    >
      <Title>VistaView Lightbox Extension - SolidStart</Title>
      <div style={{ "max-width": "1200px", margin: "0 auto" }}>
        <Nav current="vistaview" />
        <h1 style={{ "margin-bottom": "10px" }}>
          VistaView Lightbox Extension
        </h1>
        <p
          style={{
            "margin-bottom": "30px",
            color: "#999",
            "font-size": "14px",
          }}
        >
          Click any carousel item to open in a VistaView lightbox.
        </p>

        <section style={{ "margin-bottom": "60px" }}>
          <h2 style={{ "margin-bottom": "15px", "font-size": "18px" }}>
            Image Carousel
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: "16px" },
                { width: 768, columns: 2, gap: "16px" },
                { width: 1024, columns: 3, gap: "20px" },
              ],
              extensions: [VistaViewLightbox()],
            }}
          >
            <For each={images}>
              {(img, i) => (
                <div style={{ height: "300px", overflow: "hidden" }}>
                  <a href={img.src}>
                    <img
                      src={img.thumb}
                      alt={img.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        "object-fit": "cover",
                      }}
                    />
                  </a>
                </div>
              )}
            </For>
          </MotionRail>
        </section>
      </div>
    </div>
  );
}
