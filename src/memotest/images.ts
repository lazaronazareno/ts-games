export const IMAGES = [
  "https://i.ibb.co/cyL92kk/n-logo-bleach-symbol-brand-manga-png.webp",
  "https://i.ibb.co/4W1fTLC/pngegg-1.webp",
  "https://i.ibb.co/Rb5crFS/pngegg-3.webp",
  "https://i.ibb.co/6NxtS7t/pngegg-5.webp",
  "https://i.ibb.co/5h4tgVt/pngegg-4.webp",
  "https://i.ibb.co/6Dbcp83/seeker-one-piece-treasure-cruise-png.webp",
  "https://i.ibb.co/GJ5wFjQ/pngegg-2.webp",
  "https://i.ibb.co/qDPDsX5/pngegg.webp"
]
  .flatMap((image) => [`a|${image}`, `b|${image}`])
  .sort(() => Math.random() - 0.5)

