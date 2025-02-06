import {action, computed, makeObservable, observable} from 'mobx';

class DeepLinkingStore {
  state = {
    allow: true,
  };

  reset = () => {
    this.state.allow = true;
  };
  setAllow = allow => {
    this.state.allow = allow;
  };

  get getAllow() {
    return this.state.allow;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setAllow: action,
      getAllow: computed,
    });
  }
}

export const DEEP_LINKING_STORE = new DeepLinkingStore();
