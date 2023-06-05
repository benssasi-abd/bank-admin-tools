export default function uuidnum() {
  return 'xxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 8) | 0,
      v = c === 'x' ? r : '';
    return v.toString(16);
  });
}
