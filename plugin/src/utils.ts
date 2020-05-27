
export function upperFirst(string) {
  return string.replace(/(^\w)/, (replacement) => {
    return replacement.toUpperCase();
  });
}
