export function formatDateToText(inputDate: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  function getDaySuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const formattedDate = `${months[month]}, ${day}${getDaySuffix(day)}, ${year}`;
  return formattedDate;
}
