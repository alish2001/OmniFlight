export function numberWithCommas(num) {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return Number(num).toLocaleString("en", options);
}
