export function getGradient(index: number): string {
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
}
