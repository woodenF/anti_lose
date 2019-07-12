export function JsonToString(data: object = {}): string {
  if (data === {}) return '';
  const keys = Object.keys(data);
  const str = keys.map(item => `${item}=${(data as any)[item]}`);
  return str.join('&')
}

export function checkPhone(phone: string) {
  return /^1[3456789]\d{9}$/.test(phone)
}
