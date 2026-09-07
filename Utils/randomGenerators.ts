export function generateRandomPhone(): string {
  return String(Math.floor(1000000 + Math.random() * 9000000));
}

export function generateRandomWebsite(): string {
  const randomText = Math.random().toString(36).substring(2, 8);
  return `www.${randomText}-${Date.now()}.com`;
}
