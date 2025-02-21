import {action, computed, makeObservable, observable} from 'mobx';

class feedsStore {
  state = {
    error: true,
    errorText: '',
    loading: true,
    success: false,
    data: {
      message: '',
      upcomingEvents: [],
      liveEvents: [],
      suggestedEvents: [],
    },
    refreshing: false,
  };

  reset = () => {
    this.state.error = true;
    this.state.errorText = '';
    this.state.loading = true;
    this.state.success = false;
    this.state.data = {};
    this.state.refreshing = false;
  };

  formatData = () => {
    this.state.data.liveEvents.forEach(function (element) {
      element.isLive = true;
    });
    this.state.data.upcomingEvents.forEach(function (element) {
      element.isLive = false;
    });
  };
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

  setInterested = (val, eventId) => {
    let le = this.state.data.liveEvents.find(val => {
      return val.EventId === eventId;
    });

    if (le) {
      le.isInterested = val;
      return;
    }

    let ue = this.state.data.upcomingEvents.find(val => {
      return val.EventId === eventId;
    });

    if (ue) {
      ue.isInterested = val;
      return;
    }

    let se = this.state.data.suggestedEvents.find(val => {
      return val.EventId === eventId;
    });

    if (se) {
      se.isInterested = val;
      return;
    }
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      formatData: action,
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

      reset: action,
    });
  }
}

export const FEEDS_STORE = new feedsStore();
