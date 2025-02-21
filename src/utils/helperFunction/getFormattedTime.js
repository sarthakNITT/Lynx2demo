import moment from 'moment';
export const getFormattedTime = date => {
  let dateObject = new Date(date);

  return moment(dateObject).format('h:mm A');
};

export const formatToIndiaTime = date => {
  let offset = date.getTimezoneOffset();
  let indOffset = -330; //Offset for IST in minutes
  let indiaTime = new Date(
    moment(new Date(date)).subtract(offset - indOffset, 'm'),
  );
  return indiaTime;
};
export const formatToDate = date => {
  console.log(date);
  let offset = date.getTimezoneOffset();
  let newDate = new Date(moment(new Date(date)).subtract(offset, 'm'));
  console.log(newDate);
  return newDate;
};
export const getIndiaTime = date => {
  let offset = date.getTimezoneOffset();
  let indOffset = -330; //Offset for IST in minutes
  let indiaTime = new Date(moment(new Date(date)).add(offset - indOffset, 'm'));
  return indiaTime;
};

export const getTomorrow = date => {
  date.setDate(date.getDate() + 1);
  return date;
};
