// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { API_STORE } from '../../mobx/API_STORE';
import { DEPARTMENT_STORE } from '../../mobx/DEPARTMENT_STORE';
import { STUDENT_REGISTRATION_STORE } from '../../mobx/STUDENT_REGISTRATION_STORE';
import { USER_STORE } from '../../mobx/USER_STORE';
import { API_GET_DEPARTMENT } from '../../utils/API_CONSTANTS';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';

const findDepartment = data => {
  let object = data.find(
    item =>
      item.rollNoPrefix ===
      USER_STORE.getUserRollNumber.toString().substring(0, 4),
  );
  if (object === undefined) {
    DEPARTMENT_STORE.setDepartmentFound(false);
    DEPARTMENT_STORE.setRemainingDepartment(data);
  } else {
    DEPARTMENT_STORE.setDepartmentFound(true);

    STUDENT_REGISTRATION_STORE.setDepartment(
      object.courseName + ' - ' + object.departmentName.toString(),
    );
    STUDENT_REGISTRATION_STORE.setDepartmentId(object._id);
  }
};

export const getDepartmentAPI = (toast, setLoading) => {
  setLoading(true);

  // NetInfo.fetch().then ((state) => {
  //   if (state.isConnected === true) {
  //    axios
  //       .get(API_STORE.getBaseUrl + API_GET_DEPARTMENT)
  //       .then(async (response) => {
  //         if (response.status === 200) {
  //           const finalData = await response.data.result;
  //           DEPARTMENT_STORE.setDepartmentList(finalData);
  //           setLoading(false);

  //           await findDepartment(response.data.result);
  //           console.log('Success to scroll2');

  //           // setFirst(false);
  //         }
  //       })
  //       .catch(error => {
  //         setLoading(false);

  //         if (error.response) {
  //           toast.show(error.response.data.message, { type: 'warning' });
  //         } else if (error.request) {
  //           toast.show(SERVER_ERROR, { type: 'warning' });
  //         } else {
  //           console.log("in department",error );
  //           toast.show(UNEXPECTED_ERROR, { type: 'warning' });
  //         }

  //         DEPARTMENT_STORE.setError(true);
  //       });
  //   } else {
  //     toast.show(NO_NETWORK, { type: 'warning' });
  //   }
  // });
};
