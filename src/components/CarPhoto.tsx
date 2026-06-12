/**
 * Car image. If the fixture provides a real photo path, show it. Otherwise
 * draw a branded placeholder: the car's colour as a backdrop + a white
 * side-view silhouette. Always renders → no broken-image dead ends.
 */
import type { Car } from "@/fixtures/cars";

export function CarPhoto({
  car,
  aspect = "16/9",
  rounded = false,
}: {
  car: Car;
  aspect?: string;
  rounded?: boolean;
}) {
  const title = `${car.make} ${car.model}`;
  if (car.image) {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: aspect,
          background: "#f0f0f0",
          overflow: "hidden",
          borderRadius: rounded ? "var(--radius)" : 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }
  return (
    <div
      aria-label={title}
      style={{
        width: "100%",
        aspectRatio: aspect,
        position: "relative",
        overflow: "hidden",
        borderRadius: rounded ? "var(--radius)" : 0,
        background: `linear-gradient(135deg, ${car.color} 0%, ${shade(car.color, -18)} 100%)`,
      }}
    >
      {/* faint diagonal racing stripes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 18px, transparent 18px 36px)",
        }}
      />
      <svg
        viewBox="0 0 220 90"
        style={{
          position: "absolute",
          bottom: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "auto",
          opacity: 0.92,
        }}
      >
        {/* simple side-view silhouette */}
        <path
          d="M10 62 Q12 48 30 46 L70 44 Q84 30 108 29 L150 30 Q172 32 188 46 L206 50 Q214 52 214 60 L214 66 Q214 70 208 70 L188 70 A16 16 0 0 0 156 70 L92 70 A16 16 0 0 0 60 70 L16 70 Q10 70 10 64 Z"
          fill="#ffffff"
          opacity="0.95"
        />
        {/* windows */}
        <path d="M78 44 L100 33 L130 33 L150 44 Z" fill={car.color} opacity="0.55" />
        {/* wheels */}
        <circle cx="76" cy="70" r="11" fill="#1a1a1a" />
        <circle cx="76" cy="70" r="4.5" fill="#ffffff" />
        <circle cx="172" cy="70" r="11" fill="#1a1a1a" />
        <circle cx="172" cy="70" r="4.5" fill="#ffffff" />
      </svg>
      <span
        style={{
          position: "absolute",
          top: 8,
          left: 10,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: ".5px",
          color: "rgba(255,255,255,.7)",
          textTransform: "uppercase",
        }}
      >
        {car.bodyType}
      </span>
    </div>
  );
}

/** Lighten/darken a hex colour by `amt` percent (−100..100). */
function shade(hex: string, amt: number): string {
  const m = hex.replace("#", "");
  const n = parseInt(
    m.length === 3 ? m.split("").map((c) => c + c).join("") : m,
    16,
  );
  const r = clamp((n >> 16) + Math.round((amt / 100) * 255));
  const g = clamp(((n >> 8) & 0xff) + Math.round((amt / 100) * 255));
  const b = clamp((n & 0xff) + Math.round((amt / 100) * 255));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
function clamp(v: number): number {
  return Math.max(0, Math.min(255, v));
}
