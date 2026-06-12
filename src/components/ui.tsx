/**
 * Shared presentational primitives — faithful copies of the production app's
 * look (red #e10600, sharp 2px corners, Saira Condensed + JetBrains Mono).
 * No hooks → usable from both server and client components.
 */
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

// ── Button ───────────────────────────────────────────────────────────────────
export function Button({
  variant = "primary",
  style,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: ".5px",
    minHeight: "var(--control-h)",
    padding: "0 16px",
    borderRadius: "var(--radius)",
    cursor: "pointer",
    border: "2px solid var(--red)",
  };
  const skin: React.CSSProperties =
    variant === "primary"
      ? { background: "var(--red)", color: "#fff" }
      : { background: "transparent", color: "var(--ink)", borderColor: "#ccc" };
  return (
    <button className="press" style={{ ...base, ...skin, ...style }} {...rest} />
  );
}

// ── Badge ────────────────────────────────────────────────────────────────────
type Tone = "verified" | "status" | "neutral" | "red";
const GREY: React.CSSProperties = {
  background: "#f0f0f0",
  color: "var(--muted)",
  border: "1px solid var(--line)",
};
const TONE_STYLES: Record<Tone, React.CSSProperties> = {
  verified: { background: "#e6f4ea", color: "#1a7f37", border: "1px solid #a8d5b0" },
  status: GREY,
  neutral: GREY,
  red: { background: "#fdecec", color: "var(--red)", border: "1px solid #f5b9b8" },
};
export function Badge({
  tone = "neutral",
  style,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: ".5px",
    padding: "2px 7px",
    borderRadius: "var(--radius)",
    display: "inline-block",
    lineHeight: "18px",
  };
  return <span style={{ ...base, ...TONE_STYLES[tone], ...style }} {...rest} />;
}

// ── Card ─────────────────────────────────────────────────────────────────────
export function Card({ style, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const base: React.CSSProperties = {
    background: "var(--white)",
    border: "1.5px solid var(--line)",
    borderRadius: "var(--radius)",
    padding: 14,
  };
  return <div style={{ ...base, ...style }} {...rest} />;
}

// ── Input / Select ───────────────────────────────────────────────────────────
const CONTROL: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 14,
  height: "var(--control-h)",
  padding: "0 10px",
  borderRadius: "var(--radius)",
  border: "1.5px solid var(--line)",
  background: "var(--white)",
  color: "var(--ink)",
  outline: "none",
  width: "100%",
};
export function Input({ style, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input style={{ ...CONTROL, ...style }} {...rest} />;
}
export function Select({
  style,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select style={{ ...CONTROL, cursor: "pointer", ...style }} {...rest} />;
}

// ── Avatar (hashed-colour initials) ──────────────────────────────────────────
function hashColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const PALETTE = [
    "#2563eb", "#7c3aed", "#059669", "#d97706",
    "#dc2626", "#0891b2", "#65a30d", "#9333ea",
  ];
  return PALETTE[h % PALETTE.length];
}
function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
export function Avatar({
  name,
  size = 32,
  style,
}: {
  name: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: size,
    height: size,
    borderRadius: "var(--radius)",
    background: hashColor(name),
    color: "#fff",
    fontFamily: "var(--font-mono)",
    fontWeight: 700,
    fontSize: Math.round(size * 0.38),
    letterSpacing: ".5px",
    flexShrink: 0,
    userSelect: "none",
  };
  return <span style={{ ...base, ...style }}>{initials(name)}</span>;
}

// ── Section heading ──────────────────────────────────────────────────────────
export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 26,
        textTransform: "uppercase",
        letterSpacing: ".5px",
        margin: "0 0 14px",
      }}
    >
      {children}
    </h1>
  );
}

// ── CHF formatter (Swiss apostrophe grouping) ────────────────────────────────
export function chf(n: number): string {
  return `CHF ${n.toLocaleString("de-CH")}`;
}
