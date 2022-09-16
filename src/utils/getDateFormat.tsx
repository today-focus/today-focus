export default function getDateFormat(milliseconds: number) {
  const date = new Date(milliseconds);

  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];

  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  return `${year}/${month + 1}/${day} ${hour}:${minutes}:${seconds}`;
}
