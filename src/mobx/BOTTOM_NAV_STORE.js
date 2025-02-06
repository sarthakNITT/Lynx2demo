import {action, computed, makeObservable, observable} from 'mobx';

class BottomNavStore {
  state = {
    tabVisibility: true,
  };

  reset = () => {
    this.state.tabVisibility = true;
  };
  setTabVisibility = visibility => {
    this.state.tabVisibility = visibility;
  };

  get getTabVisibility() {
    return this.state.tabVisibility;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setTabVisibility: action,
      getTabVisibility: computed,
    });
  }
}

export const BOTTOM_NAV_STORE = new BottomNavStore();
