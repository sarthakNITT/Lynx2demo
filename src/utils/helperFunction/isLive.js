export const isLive = (startDate, endDate) => {
  let sd = new Date(startDate);
  let ed = new Date(endDate);
  var currentDate = new Date();
  //console.log('startDate' + startDate);
  if (
    currentDate.getTime() >= sd.getTime() &&
    currentDate.getTime() <= ed.getTime()
  )
    return true;
  else false;
};
