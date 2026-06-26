"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { MotionRail } from "motionrail/react";
import type {
  MotionRail as MotionRailClass,
  MotionRailState,
} from "motionrail";
import "motionrail/style.css";

export default function DebugPage() {
  const mrRef = useRef<MotionRailClass | null>(null);
  const [info, setInfo] = useState({
    dragging: false,
    scrollLeft: 0,
    velocity: 0,
    pointerId: null as number | null,
  });

  const options = useMemo(
    () => ({
      breakpoints: [
        { columns: 1, gap: "12px" },
        { width: 400, columns: 2, gap: "12px" },
      ],
      onChange: (st: MotionRailState) => {
        setInfo((prev) => ({ ...prev }));
      },
    }),
    [],
  );

  useEffect(() => {
    const poll = setInterval(() => {
      const mr = mrRef.current as Record<string, unknown> | null;
      if (!mr) return;
      const el = mr.element as HTMLElement | undefined;
      const scrollable = el?.querySelector("[data-motionrail-scrollable]");
      setInfo({
        dragging: !!mr.isDragging,
        scrollLeft: scrollable?.scrollLeft ?? 0,
        velocity: (mr.velocity as number) ?? 0,
        pointerId: (mr.pointerId as number | null) ?? null,
      });
    }, 60);
    return () => clearInterval(poll);
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        background: "#000",
        color: "#eaeaea",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "18px", marginBottom: "8px" }}>
          iPhone Drag Debug
        </h1>

        <MotionRail ref={mrRef} options={options}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              style={{
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                fontWeight: "bold",
                color: "white",
                background: `hsl(${i * 35}, 80%, 50%)`,
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              {i}
            </div>
          ))}
        </MotionRail>

        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "#111",
            borderRadius: "8px",
            fontSize: "14px",
            fontFamily: "monospace",
            lineHeight: "1.8",
          }}
        >
          <div>dragging: {String(info.dragging)}</div>
          <div>velocity: {info.velocity.toFixed(4)}</div>
          <div>scrollLeft: {info.scrollLeft}</div>
          <div>pointerId: {info.pointerId}</div>
        </div>
      </div>
    </div>
  );
}
