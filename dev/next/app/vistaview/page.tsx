"use client";

import { MotionRail } from "motionrail/react";
import { VistaViewLightbox } from "motionrail/extensions/vistaview";
import "motionrail/style.css";
import Nav from "../components/Nav";

const images = [
  {
    src: "https://picsum.photos/seed/v1/800/600",
    thumb: "https://picsum.photos/seed/v1/400/300",
    alt: "Photo 1",
  },
  {
    src: "https://picsum.photos/seed/v2/800/600",
    thumb: "https://picsum.photos/seed/v2/400/300",
    alt: "Photo 2",
  },
  {
    src: "https://picsum.photos/seed/v3/800/600",
    thumb: "https://picsum.photos/seed/v3/400/300",
    alt: "Photo 3",
  },
  {
    src: "https://picsum.photos/seed/v4/800/600",
    thumb: "https://picsum.photos/seed/v4/400/300",
    alt: "Photo 4",
  },
  {
    src: "https://picsum.photos/seed/v5/800/600",
    thumb: "https://picsum.photos/seed/v5/400/300",
    alt: "Photo 5",
  },
  {
    src: "https://picsum.photos/seed/v6/800/600",
    thumb: "https://picsum.photos/seed/v6/400/300",
    alt: "Photo 6",
  },
  {
    src: "https://picsum.photos/seed/v7/800/600",
    thumb: "https://picsum.photos/seed/v7/400/300",
    alt: "Photo 7",
  },
  {
    src: "https://picsum.photos/seed/v8/800/600",
    thumb: "https://picsum.photos/seed/v8/400/300",
    alt: "Photo 8",
  },
];

export default function VistaViewPage() {
  return (
    <div
      style={{
        padding: "40px",
        background: "#000",
        color: "#eaeaea",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Nav current="vistaview" />
        <h1 style={{ marginBottom: "10px" }}>VistaView Lightbox Extension</h1>
        <p style={{ marginBottom: "30px", color: "#999", fontSize: "14px" }}>
          Click any carousel item to open in a VistaView lightbox.
        </p>

        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>
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
            {images.map((img, i) => (
              <div key={i} style={{ height: "300px", overflow: "hidden" }}>
                <a href={img.src}>
                  <img
                    src={img.thumb}
                    alt={img.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </a>
              </div>
            ))}
          </MotionRail>
        </section>
      </div>
    </div>
  );
}
