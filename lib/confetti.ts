import confetti from "canvas-confetti";

/** Short celebratory burst for successful actions (e.g. send for approval). */
export function fireSuccessConfetti() {
  const colors = ["#22c55e", "#3b82f6", "#eab308", "#a855f7"];
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.65 },
    colors,
  });
}
