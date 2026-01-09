export const getYears = (yearsAfter: number) => {
  const currentYear = new Date().getFullYear();

  const yearsArray: number[] = [];

  for (let i = 0; i <= yearsAfter; i++) {
    yearsArray.push(currentYear + i);
  }

  return yearsArray;
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
