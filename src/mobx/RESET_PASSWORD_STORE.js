import {action, computed, makeObservable, observable} from 'mobx';

class RESET_DATA {
  state = {
    isStudent: true,
    username: '',

    password: '',
    studentToken: '',
    tokenFetched: false,
    clubsToken: '',
    clubsTokenFetched: false,
    passResetSuccess: false,

    loading: false,
    error: false,
    errorText: '',
    success: false,

    resendButton: false,
    secondsRemaining: 600,
    timerStatus: 'Stopped',
  };

  reset = () => {
    this.state.loading = false;
    this.state.success = false;
    this.state.isStudent = true;
    this.state.username = '';
    this.state.error = false;
    this.state.errorText = '';
    this.state.password = '';
    this.state.studentToken = '';
    this.state.tokenFetched = false;
    this.state.clubsToken = '';
    this.state.clubsTokenFetched = false;
    this.state.passResetSuccess = false;
    this.state.resendButton = false;
    this.state.secondsRemaining = 600;
    this.state.timerStatus = 'Stopped';
  };
  setResendButton = val => {
    this.state.resendButton = val;
  };

  get getResendButton() {
    return this.state.resendButton;
  }

  setLoading = val => {
    this.state.loading = val;
  };

  get getLoading() {
    return this.state.loading;
  }

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  setIsStudent = val => {
    this.state.isStudent = val;
  };

  get getIsStudent() {
    return this.state.isStudent;
  }

  setUsername = val => {
    this.state.username = val;
  };

  get getUsername() {
    return this.state.username;
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

  setStudentPassword = val => {
    this.state.password = val;
  };

  get getStudentPassword() {
    return this.state.password;
  }

  setStudentToken = val => {
    this.state.studentToken = val;
  };

  get getStudentToken() {
    return this.state.studentToken;
  }

  setStudentTokenFetched = val => {
    this.state.tokenFetched = val;
  };

  get getStudentTokenFetched() {
    return this.state.tokenFetched;
  }

  setClubsToken = val => {
    this.state.clubsToken = val;
  };

  get getClubsToken() {
    return this.state.clubsToken;
  }

  setClubsTokenFetched = val => {
    this.state.clubsTokenFetched = val;
  };

  get getClubsTokenFetched() {
    return this.state.clubsTokenFetched;
  }

  setPasswordResetSuccess = val => {
    this.state.passResetSuccess = val;
  };

  get getPasswordResetSuccess() {
    return this.state.passResetSuccess;
  }

  setTimerStatus = val => {
    this.state.timerStatus = val;
  };

  get getTimerStatus() {
    return this.state.timerStatus;
  }

  setSecondsRemaining = val => {
    this.state.secondsRemaining = val;
  };

  get getSecondsRemaining() {
    return this.state.secondsRemaining;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setIsStudent: action,
      getIsStudent: computed,

      setUsername: action,
      getUsername: computed,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setStudentPassword: action,
      getStudentPassword: computed,

      setStudentToken: action,
      getStudentToken: computed,

      setStudentTokenFetched: action,
      getStudentTokenFetched: computed,

      setClubsToken: action,
      getClubsToken: computed,

      setClubsTokenFetched: action,
      getClubsTokenFetched: computed,

      setPasswordResetSuccess: action,
      getPasswordResetSuccess: computed,

      setSuccess: action,
      getSuccess: computed,

      setLoading: action,
      getLoading: computed,

      setResendButton: action,
      getResendButton: computed,

      setTimerStatus: action,
      getTimerStatus: computed,

      setSecondsRemaining: action,
      getSecondsRemaining: computed,
    });
  }
}

export const RESET_STORE = new RESET_DATA();
