import {action, computed, makeObservable, observable} from 'mobx';

class API {
  state = {
    baseUrl: '',
    cdn: '',
  };

  reset = () => {
    this.state.baseUrl = '';
    this.state.cdn = '';
  };

  setCDN = val => {
    this.state.cdn = val;
  };

  get getCDN() {
    return this.state.cdn;
  }

  setBaseUrl = val => {
    this.state.baseUrl = val;
  };

  get getBaseUrl() {
    return this.state.baseUrl;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setBaseUrl: action,
      getBaseUrl: computed,

      setCDN: action,
      getCDN: computed,
    });
  }
}

export const API_STORE = new API();
