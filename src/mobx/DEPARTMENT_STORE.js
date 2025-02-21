import {action, computed, makeObservable, observable} from 'mobx';

class departmentStore {
  state = {
    departmentList: null,
    departmentFound: false,
    remainingDepartment: null,
    error: false,
    errorText: '',
    loading: false,
  };

  reset = () => {
    this.state.departmentList = null;
    this.state.departmentFound = null;
    this.state.remainingDepartment = null;
    this.state.error = false;
    this.state.errorText = '';
    this.state.loading = false;
  };

  setRemainingDepartment = data => {
    this.state.remainingDepartment = data.reduce((result, element) => {
      if (element.rollNoPrefix === '') {
        element.name = element.courseName + ' - ' + element.departmentName;
        result.push(element);
      }
      return result;
    }, []);
    console.log('Remaining DEPT ' + this.state.remainingDepartment);
  };

  get getRemainingDepartment() {
    return this.state.remainingDepartment;
  }

  setDepartmentList = data => {
    this.state.setDepartmentList = data;
  };

  get getDepartmentList() {
    return this.state.departmentList;
  }

  setDepartmentFound = val => {
    this.state.departmentFound = val;
  };

  get getDepartmentFound() {
    return this.state.departmentFound;
  }

  setError = val => {
    this.state.error = val;
  };

  get getError() {
    return this.state.error;
  }

  setErrorText = val => {
    this.state.errorText = val;
  };

  get getErrorText() {
    return this.state.errorText;
  }

  setLoading = val => {
    this.state.loading = val;
  };

  get getLoading() {
    return this.state.loading;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setDepartmentList: action,
      getDepartmentList: computed,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setDepartmentFound: action,
      getDepartmentFound: computed,

      setRemainingDepartment: action,
      getRemainingDepartment: computed,
    });
  }
}

export const DEPARTMENT_STORE = new departmentStore();
