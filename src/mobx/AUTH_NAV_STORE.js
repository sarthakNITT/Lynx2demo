import {action, computed, makeObservable, observable} from 'mobx';

class AuthStore {
  state = {
    splashLoading: true,
  };

  reset = () => {
    this.state.splashLoading = true;
  };
  setSplashLoading = loading => {
    this.state.splashLoading = loading;
  };

  get getSplashLoading() {
    return this.state.splashLoading;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setSplashLoading: action,
      getSplashLoading: computed,
    });
  }
}

export const AUTH_NAV_STORE = new AuthStore();
