import {action, computed, makeObservable, observable} from 'mobx';

class FEEDBACK {
  state = {
    feedback: '',
    type: '',

    loading: false,
    errorText: '',
    error: false,
    success: false,
  };

  reset = () => {
    this.state.type = '';
    this.state.feedback = '';
    this.state.loading = false;
    this.state.errorText = '';
    this.state.error = false;
    this.state.success = false;
  };

  setType = val => {
    this.state.type = val;
  };

  get getType() {
    return this.state.type;
  }

  setFeedback = val => {
    this.state.feedback = val;
  };

  get getFeedback() {
    return this.state.feedback;
  }

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  setLoading = val => {
    this.state.loading = val;
  };

  get getLoading() {
    return this.state.loading;
  }

  setErrorText = val => {
    this.state.errorText = val;
  };

  get getErrorText() {
    return this.state.errorText;
  }

  setError = val => {
    this.state.error = val;
  };

  get getError() {
    return this.state.error;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setFeedback: action,
      getFeedback: computed,

      setType: action,
      getType: computed,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setSuccess: action,
      getSuccess: computed,

      reset: action,
    });
  }
}

export const FEEDBACK_STORE = new FEEDBACK();
