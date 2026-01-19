import { component$, useSignal, noSerialize, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { MotionRail } from "motionrail/qwik";
import { MotionRail as MotionRailClass } from "motionrail";
import "motionrail/style.css";
import Nav from "../components/Nav";

export default component$(() => {
  const items = useSignal([1, 2, 3]);

  const getGradient = (index: number): string => {
    const gradients = [
      "#667eea 0%, #764ba2 100%",
      "#f093fb 0%, #f5576c 100%",
      "#4facfe 0%, #00f2fe 100%",
      "#43e97b 0%, #38f9d7 100%",
      "#fa709a 0%, #fee140 100%",
      "#30cfd0 0%, #330867 100%",
      "#a8edea 0%, #fed6e3 100%",
      "#ff9a9e 0%, #fecfef 100%",
    ];
    return gradients[(index - 1) % gradients.length];
  };

  // Generate containerName and containerQueries for FOUC prevention (same as React)
  const { containerName, containerQueries } = MotionRailClass.getBreakPoints(
    [
      { columns: 1, gap: "16px" },
      { width: 768, columns: 2, gap: "16px" },
      { width: 1024, columns: 3, gap: "20px" },
    ],
    8,
  );

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
        <Nav current="main" />
        <h1 style={{ marginBottom: "10px" }}>MotionRail Test Page</h1>
        <p style={{ marginBottom: "30px", color: "#999", fontSize: "14px" }}>
          Comprehensive test suite for MotionRail Qwik wrapper
        </p>

        {/* Basic Carousel */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>
            Basic Carousel (3 columns on desktop, 2 on tablet, 1 on mobile)
          </h2>
          <style data-motionrail-style={containerName}>
            {containerQueries}
          </style>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: "16px" },
                { width: 768, columns: 2, gap: "16px" },
                { width: 1024, columns: 3, gap: "20px" },
              ],
              // onChange: $((state: any) => console.log('Carousel changed:', state)),
              containerName,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                style={{
                  height: "300px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "white",
                  background: `linear-gradient(135deg, ${getGradient(i)})`,
                }}
              >
                {i}
              </div>
            ))}
          </MotionRail>
        </section>

        {/* Autoplay Carousel */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>
            Carousel with Autoplay
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: "16px" },
                { width: 768, columns: 2, gap: "16px" },
                { width: 1024, columns: 3, gap: "20px" },
              ],
              autoplay: true,
              delay: 2500,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                style={{
                  height: "300px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "white",
                  background: `linear-gradient(135deg, ${getGradient(i)})`,
                }}
              >
                {i}
              </div>
            ))}
          </MotionRail>
        </section>

        {/* Dynamic Content */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>
            Dynamic Content (Add/Remove Items)
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: "16px" },
                { width: 768, columns: 2, gap: "16px" },
                { width: 1024, columns: 3, gap: "20px" },
              ],
            }}
          >
            {items.value.map((i) => (
              <div
                key={i}
                style={{
                  height: "300px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "white",
                  background: `linear-gradient(135deg, ${getGradient(i)})`,
                }}
              >
                {i}
              </div>
            ))}
          </MotionRail>
          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button
              onClick$={() =>
                (items.value = [...items.value, items.value.length + 1])
              }
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "#667eea",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Add Item
            </button>
            <button
              onClick$={() => (items.value = items.value.slice(0, -1))}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "#667eea",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Remove Item
            </button>
          </div>
        </section>

        {/* Edge Case: Single Item */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>
            Edge Case: Single Item
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: "16px" },
                { width: 768, columns: 2, gap: "16px" },
              ],
            }}
          >
            <div
              style={{
                height: "300px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                fontWeight: "bold",
                color: "white",
                background: `linear-gradient(135deg, ${getGradient(1)})`,
              }}
            >
              1
            </div>
          </MotionRail>
        </section>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "MotionRail Test Page - Qwik",
  meta: [
    {
      name: "description",
      content: "Comprehensive test suite for MotionRail Qwik wrapper",
    },
  ],
};
