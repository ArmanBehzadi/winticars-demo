/**
 * Friendly "this is a demo" note for dead ends — never show a broken screen.
 */
export function DemoNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--muted)",
        background: "#fff",
        border: "1.5px dashed var(--line)",
        borderRadius: "var(--radius)",
        padding: "12px 14px",
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: ".5px",
          color: "var(--red)",
          border: "1px solid var(--red)",
          borderRadius: "var(--radius)",
          padding: "1px 5px",
          flexShrink: 0,
        }}
      >
        Demo
      </span>
      <span>{children}</span>
    </div>
  );
}
