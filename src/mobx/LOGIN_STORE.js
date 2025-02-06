import {action, computed, makeObservable, observable} from 'mobx';

class loginStore {
  state = {
    error: false,
    errorText: '',
    loading: false,
  };

  reset = () => {
    this.state.error = false;
    this.state.errorText = '';
    this.state.loading = false;
  };
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

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,
    });
  }
}

export const LOGIN_STORE = new loginStore();
