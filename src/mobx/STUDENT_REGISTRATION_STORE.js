import {action, computed, makeObservable, observable} from 'mobx';

class Registration {
  state = {
    coutryCode: '91', //index of default ie India in Database
    mobile: '',
    firstName: '',
    secondName: '',
    department: 'Department',
    birthDay: new Date(new Date('January 1, 2000 00:00:00')),
    gender: 'Gender',
    nationality: 'India',
    address: '',
    aadhar: '',
    passport: null,
    profilePic: '',
    password: '',
    confirmPassword: '',
    modalVisible: '',
    dateSelected: false,
    departmentId: '',
    iscr: {
      iscr: true,
      iscommon: false,
    },
    apiSuccess: false,
    apiCall: false,
    apiErrorText: '',
    apiError: false,
    apiResponse: {},
  };

  reset = () => {
    this.state.apiResponse = {};
    this.state.apiSuccess = false;
    this.state.apiCall = false;
    this.state.apiErrorText = '';
    this.state.apiError = false;
    this.state.coutryCode = '91'; //index of default ie India in Database
    this.state.mobile = '';
    this.state.firstName = '';
    this.state.secondName = '';
    this.state.department = 'Department';
    this.state.birthDay = new Date(new Date('January 1, 2000 00:00:00'));
    this.state.gender = 'Gender';
    this.state.nationality = 'India';
    this.state.address = '';
    this.state.aadhar = '';
    this.state.passport = null;
    this.state.profilePic = '';
    this.state.password = '';
    this.state.confirmPassword = '';
    this.state.modalVisible = '';
    this.state.dateSelected = false;
    this.state.departmentId = '';
    this.state.iscr = { iscr:false, iscommon:false }; 
  };
  setApiResponse = val => {
    this.state.apiResponse = val;
  };
  get getApiResponse() {
    return this.state.apiResponse;
  }

   setIscr = (val) => {
    this.state.iscr.iscr = val;
  };

  get getIscr() {
    return this.state.iscr.iscr;
  }

  setIscommon = (val) => {
    this.state.iscr.iscommon = val;
  };


  get getIscommon() {
    return this.state.iscr.iscommon;
  }

  get getIsccr() {
    return this.state.iscr;
  }

  setApiError = val => {
    this.state.apiError = val;
  };

  get getApiError() {
    return this.state.apiError;
  }
  setApiErrorText = val => {
    this.state.apiErrorText = val;
  };

  get getApiErrorText() {
    return this.state.apiErrorText;
  }
  setApiCall = val => {
    this.state.apiCall = val;
  };

  get getApiCall() {
    return this.state.apiCall;
  }
  setApiSuccess = val => {
    this.state.apiSuccess = val;
  };

  get getApiSuccess() {
    return this.state.apiSuccess;
  }

  setPicture = val => {
    this.state.profilePic = val;
  };

  get getPicture() {
    return this.state.profilePic;
  }

  setPassword = val => {
    this.state.password = val;
  };

  get getPassword() {
    return this.state.password;
  }

  setConfirmPassword = val => {
    this.state.confirmPassword = val;
  };

  get getConfirmPassword() {
    return this.state.confirmPassword;
  }

  setAddress = val => {
    this.state.address = val;
  };

  get getAddress() {
    return this.state.address;
  }

  setAadhar = val => {
    this.state.aadhar = val;
  };

  get getAadhar() {
    return this.state.aadhar;
  }

  setPassport = val => {
    this.state.passport = val;
  };

  get getPassport() {
    return this.state.passport;
  }

  setBirthDay = val => {
    this.state.birthDay = val;
  };

  get getBirthDay() {
    return this.state.birthDay;
  }

  setDateSelected = val => {
    this.state.dateSelected = val;
  };

  get getDateSelected() {
    return this.state.dateSelected;
  }

  setDepartment = val => {
    this.state.department = val;
  };

  get getDepartment() {
    return this.state.department;
  }

  setLastName = val => {
    this.state.secondName = val;
  };

  get getLastName() {
    return this.state.secondName;
  }

  setFirstName = val => {
    this.state.firstName = val;
  };

  get getFirstName() {
    return this.state.firstName;
  }

  setCountryCode = val => {
    this.state.coutryCode = val;
  };

  get getCountryCode() {
    return this.state.coutryCode;
  }

  setMobileNumber = val => {
    this.state.mobile = val;
  };

  get getMobileNumber() {
    return this.state.mobile;
  }

  setGender = val => {
    this.state.gender = val;
  };

  get getGender() {
    return this.state.gender;
  }

  setNationality = val => {
    this.state.nationality = val;
  };

  get getNationality() {
    return this.state.nationality;
  }

  toggleModalVisible = () => {
    this.state.modalVisible = !this.state.modalVisible;
  };

  get getModalVisible() {
    return this.state.modalVisible;
  }

  setDepartmentId = val => {
    this.state.departmentId = val;
  };

  get getDepartmentId() {
    return this.state.departmentId;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setMobileNumber: action,
      getMobileNumber: computed,

      setFirstName: action,
      getFirstName: computed,

      setLastName: action,
      getLastName: computed,

      setDepartment: action,
      getDepartment: computed,

      setPassword: action,
      getPassword: computed,

      setConfirmPassword: action,
      getConfirmPassword: computed,

      setPicture: action,
      getPicture: computed,

      setAadhar: action,
      getAadhar: computed,

      setPassport: action,
      getPassport: computed,

      setBirthDay: action,
      getBirthDay: computed,

      setDateSelected: action,
      getDateSelected: computed,

      setAddress: action,
      getAddress: computed,

      setGender: action,
      getGender: computed,

      setNationality: action,
      getNationality: computed,

      toggleModalVisible: action,
      getModalVisible: computed,

      setCountryCode: action,
      getCountryCode: computed,

      setApiCall: action,
      getApiCall: computed,

      setApiError: action,
      getApiError: computed,

      setApiErrorText: action,
      getApiErrorText: computed,

      setApiSuccess: action,
      getApiSuccess: computed,

      setApiResponse: action,
      getApiResponse: computed,

      setDepartmentId: action,
      getDepartmentId: computed,

      setIscr: action,
      getIscr: computed,

      setIsCommon: action,
      getIscommon: computed,

      getIsccr: computed,
    });
  }
}

export const STUDENT_REGISTRATION_STORE = new Registration();
