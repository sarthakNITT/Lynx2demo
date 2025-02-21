export const getPermission = obj => {
  let permissions = [];
  for (const x in obj) {
    if (obj[x]) {
      permissions.push(getUIName(x));
    }
  }
  return permissions;
};

const getUIName = x => {
  switch (x) {
    case 'Dob':
      return 'Date of Birth';
    case 'MobileNo':
      return 'Mobile Number';
    case 'PictureUrl':
      return 'Profile Picture';
    case 'RollNo':
      return 'Roll Number';
    case 'DepartmentId':
      return 'Department';
    default:
      return x;
  }
};
