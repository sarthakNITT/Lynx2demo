export const isComplete = endDate => {
  let ed = new Date(endDate);
  var currentDate = new Date();
  //console.log('startDate' + startDate);
  if (currentDate.getTime() > ed.getTime()) return true;
  else return false;
};
