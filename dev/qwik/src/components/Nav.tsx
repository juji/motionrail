import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface NavProps {
  current: "main" | "arrows" | "dots" | "logger" | "thumbnails";
}

export default component$<NavProps>(({ current }) => {
  const links = [
    { href: "/", label: "Main Tests", key: "main" },
    { href: "/arrows", label: "Arrows", key: "arrows" },
    { href: "/dots", label: "Dots", key: "dots" },
    { href: "/logger", label: "Logger", key: "logger" },
    { href: "/thumbnails", label: "Thumbnails", key: "thumbnails" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: "0",
        zIndex: "1000",
        background: "#1a1a1a",
        padding: "15px 0",
        marginBottom: "30px",
        borderBottom: "1px solid #333",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
          Qwik
        </span>
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            style={{
              color: current === link.key ? "white" : "#999",
              textDecoration: current === link.key ? "underline" : "none",
              fontWeight: "500",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
});
