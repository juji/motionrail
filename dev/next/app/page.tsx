import { MotionRail } from "motionrail/react";
import { MotionRail as MotionRailClass } from "motionrail";
import "motionrail/style.css";
import Nav from "./components/Nav";
import { getGradient } from "./get-gradient";
import { DynamicCarousel } from "./dynamic-carousel";

export default function Home() {
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
          Comprehensive test suite for MotionRail React wrapper
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
              containerName,
              // onChange: (state: MotionRailState) => console.log('Carousel changed:', state),
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

        {/* Variable Columns */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>
            Variable Columns (4 → 3 → 2 → 1)
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: "12px" },
                { width: 480, columns: 2, gap: "16px" },
                { width: 768, columns: 3, gap: "20px" },
                { width: 1024, columns: 4, gap: "24px" },
              ],
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
        <DynamicCarousel />

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

        {/* Edge Case: Many Items */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>
            Edge Case: Many Items (20 Items)
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 2, gap: "16px" },
                { width: 768, columns: 3, gap: "16px" },
                { width: 1024, columns: 4, gap: "20px" },
              ],
            }}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
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
      </div>
    </div>
  );
}
