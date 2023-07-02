export function convertToOrdinal(cardinal: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const lastDigit = cardinal % 10;
  const lastTwoDigits = cardinal % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return cardinal + "th";
  }

  const suffix = suffixes[lastDigit] || "th";
  return cardinal + suffix;
}
