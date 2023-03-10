export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 1, day))))
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1));
}
