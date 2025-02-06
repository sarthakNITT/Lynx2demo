export const getFormattedDate = date => {
  let dateObject = new Date(date);

  return dateObject.toDateString();
};

export const UTCdate = date => {
  const dt = new Date(date);
  return `${dt.getUTCDate()}-${dt.getUTCMonth() + 1}-${dt.getUTCFullYear()}`;
};
