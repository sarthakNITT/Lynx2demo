import {action, makeObservable, observable, computed} from 'mobx';

class QR_Data {
  state = {
    ttl: 0,
    loading: true,
    errorText: '',
    qr: 'no_qr',
    error: false,
  };
  reset = () => {
    this.state.ttl = 0;
    this.state.errorText = '';
    this.state.loading = false;
    this.state.qr = 'no_qr';
    this.state.error = false;
  };
  setError = val => {
    this.state.error = val;
  };

  get getError() {
    return this.state.error;
  }

  setTTL = val => {
    this.state.ttl = val;
  };

  get getTTL() {
    return this.state.ttl;
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

  setQR = val => {
    this.state.qr = val;
  };

  get getQR() {
    return this.state.qr;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setQR: action,
      getQR: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setTTL: action,
      getTTL: computed,

      setError: action,
      getError: computed,
      reset: action,
    });
  }
}

export const QR_STORE = new QR_Data();
