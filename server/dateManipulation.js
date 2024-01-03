function getTimestamp() {
  const date = new Date();
  const date_generated = `${date.getFullYear()}-${getMonth(date)}-${getDay(
    date
  )}`;
  const isoString = date.toISOString();
  let offset = date.getTimezoneOffset() / 60;

  offset < 10 || offset > -10 ? (offset = `0${offset}`) : offset;

  const time_generated = `${isoString.slice(11, 19)}-${offset}`;

  return {
    date_generated: date_generated,
    time_generated: time_generated,
  };

  function getMonth(date) {
    let month = date.getMonth() + 1;
    month = addZeroToDate(month);
    return month;
  }
  function getDay(date) {
    let day = date.getDate();
    day = addZeroToDate(day);
    return day;
  }

  function addZeroToDate(date) {
    let dateWithZero = date;
    if (date < 10) {
      dateWithZero = `0${date}`;
    }
    return dateWithZero;
  }
}

module.exports = { getTimestamp };
