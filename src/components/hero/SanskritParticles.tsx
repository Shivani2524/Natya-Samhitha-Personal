"use client";

/**
 * Floating Sanskrit aksharas that drift upward with random horizontal wobble.
 * Creates a sacred, immersive atmosphere.
 */
export function SanskritParticles() {
  const characters = [
    { char: "अ", x: "5%", delay: "0s", duration: "18s", drift: "15px", rotate: "10deg" },
    { char: "ॐ", x: "15%", delay: "2s", duration: "22s", drift: "-20px", rotate: "-8deg" },
    { char: "न", x: "25%", delay: "5s", duration: "16s", drift: "25px", rotate: "15deg" },
    { char: "त", x: "35%", delay: "1s", duration: "20s", drift: "-15px", rotate: "-12deg" },
    { char: "य", x: "45%", delay: "8s", duration: "19s", drift: "10px", rotate: "20deg" },
    { char: "श", x: "55%", delay: "3s", duration: "21s", drift: "-25px", rotate: "-15deg" },
    { char: "र", x: "65%", delay: "6s", duration: "17s", drift: "20px", rotate: "8deg" },
    { char: "स", x: "75%", delay: "4s", duration: "23s", drift: "-10px", rotate: "-18deg" },
    { char: "ा", x: "85%", delay: "7s", duration: "18s", drift: "15px", rotate: "12deg" },
    { char: "ॐ", x: "92%", delay: "10s", duration: "20s", drift: "-20px", rotate: "-10deg" },
    { char: "न", x: "10%", delay: "12s", duration: "24s", drift: "30px", rotate: "25deg" },
    { char: "त", x: "50%", delay: "9s", duration: "15s", drift: "-12px", rotate: "-5deg" },
    { char: "य", x: "70%", delay: "11s", duration: "19s", drift: "18px", rotate: "14deg" },
    { char: "अ", x: "30%", delay: "14s", duration: "21s", drift: "-22px", rotate: "-20deg" },
    { char: "श", x: "80%", delay: "6.5s", duration: "17s", drift: "12px", rotate: "9deg" },
    { char: "स", x: "20%", delay: "13s", duration: "22s", drift: "-18px", rotate: "-16deg" },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {characters.map((p, i) => (
        <span
          key={i}
          className="absolute font-sanskrit text-[var(--gold-bright)] animate-float-up"
          style={{
            left: p.x,
            bottom: "-20px",
            fontSize: `${12 + (i % 4) * 4}px`,
            ["--float-duration" as string]: p.duration,
            ["--float-delay" as string]: p.delay,
            ["--drift-x" as string]: p.drift,
            ["--drift-r" as string]: p.rotate,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
