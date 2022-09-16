export default function getDateFormat(now: number) {
  const date = new Date(now);

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
