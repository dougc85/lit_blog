export default function dateToString(mongoDate) {
  const date = new Date(mongoDate);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  let halfDay = 'AM';
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour > 12) {
    hour -= 12;
    halfDay = 'PM';
  } else if (hour === 12) {
    halfDay = 'PM';
  } else if (hour === 0) {
    hour += 12;
  }

  if (minutes < 10) {
    minutes = minutes.toString();
    minutes = '0'.concat(minutes);
  }

  console.log(date, 'date');

  return `${month.toUpperCase()} ${day}, ${year} AT ${hour}:${minutes} ${halfDay}`
}