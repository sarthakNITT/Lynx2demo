export const isUpcoming = startDate => {
  let sd = new Date(startDate);

  var currentDate = new Date();
  //console.log('startDate' + startDate);
  if (currentDate.getTime() < sd.getTime()) return true;
  else return false;
};
