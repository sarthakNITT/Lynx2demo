import {action, computed, makeObservable, observable} from 'mobx';

const LENGTH = 10;
class activityStore {
  state = {
    error: true,
    errorText: '',
    loading: true,
    success: false,
    data: [],
    refreshing: false,
    displayData: [],
  };

  reset = () => {
    this.state.error = true;
    this.state.errorText = '';
    this.state.loading = true;
    this.state.success = false;
    this.state.data = [];
    this.state.refreshing = false;
    this.state.displayData = [];
  };

  loadDisplayData = page => {
    if (this.state.displayData.length === this.state.data.length && page != 0) {
      return;
    }
    const startElement = page * LENGTH;
    const endElement = page * LENGTH + LENGTH;
    if (page === 0) {
      this.state.displayData = [
        ...this.state.data.slice(startElement, endElement),
      ];
      return;
    }

    this.state.displayData = [
      ...this.state.displayData,
      ...this.state.data.slice(startElement, endElement),
    ];
  };

  get getDisplayData() {
    return this.state.displayData;
  }

  setRefreshing = val => {
    this.state.refreshing = val;
  };

  get getRefreshing() {
    return this.state.refreshing;
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

  setData = val => {
    this.state.data = val;
    this.loadDisplayData(0);
  };

  get getData() {
    return this.state.data;
  }

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
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

      setData: action,
      getData: computed,

      setSuccess: action,
      getSuccess: computed,

      setRefreshing: action,
      getRefreshing: computed,

      loadDisplayData: action,
      getDisplayData: computed,
    });
  }
}

export const ACTIVITY_STORE = new activityStore();
