import { action, computed, makeObservable, observable } from 'mobx';

class UserData {
  state = {
    userName: '',
    userType: '',
    userRollNumber: '',
    userToken: '',
    userRegToken: '',
    redirectUpdate: false,
    lynxGPT: 'NULL',
    
    //unique ID (Android ID)
    uniqueID: '',

    firebaseToken: 'abc',

    refreshToken: '',

    //clubId to be used only if user type is club
    clubId: '',

    CR: {
      isCR: false,
      isCommon: false,
    },

    //for notifications
    appLoaded: false,
  };

  reset = () => {
    this.state.userName = '';
    this.state.userType = '';
    this.state.userRollNumber = '';
    this.state.userToken = '';
    this.state.userRegToken = '';
    this.state.redirectUpdate = false;
    //unique ID (Android ID)
    this.state.uniqueID = '';

    //clubId to be used only if user type is club
    this.state.clubId = '';
    this.state.refreshToken = '';
    this.state.appLoaded = false;
    this.state.CR = { isCR:false, isCommon:false }; 
  };

  setUserRollNumber = rNo => {
    this.state.userRollNumber = rNo;
  };

  get getUserRollNumber() {
    return this.state.userRollNumber;
  }

  setRefreshToken = val => {
    this.state.refreshToken = val;
  };

  get getRefreshToken() {
    return this.state.refreshToken;
  }

  setisCR = (val) => {
    this.state.CR = val;
  };

  get getisCR() {
    return this.state.CR;
  }

  setIsCommon = (val) => {
    this.state.CR.isCommon = val;
  };

  get getIsCommon() {
    return this.state.CR.isCommon;
  }

  setClubId = val => {
    this.state.clubId = val;
  };

  get getClubId() {
    return this.state.clubId;
  }

  setUniqueId = val => {
    this.state.uniqueID = val;
  };

  get getUniqueId() {
    return this.state.uniqueID;
  }

  setFirebaseToken = val => {
    this.state.firebaseToken = val;
  };

  get getFirebaseToken() {
    return this.state.firebaseToken;
  }

  setUserType = type => {
    this.state.userType = type;
  };

  get getUserType() {
    return this.state.userType;
  }

  setUserToken = token => {
    this.state.userToken = token;
  };

  get getUserToken() {
    return this.state.userToken;
  }

  setUserRegToken = rtoken => {
    this.state.userRegToken = rtoken;
  };

  get getUserRegToken() {
    return this.state.userRegToken;
  }

  setRedirectUpdate = val => {
    this.state.redirectUpdate = val;
  };

  get getRedirectUpdate() {
    return this.state.redirectUpdate;
  }
  setAppLoaded = val => {
    this.state.appLoaded = val;
  };

  get getAppLoaded() {
    return this.state.appLoaded;
  }

  setLynxgpt = val => {
    this.state.lynxGPT = val;
  }

  get getLynxgpt() {
    return this.state.lynxGPT;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      setUserToken: action,
      getUserToken: computed,
      setUserRegToken: action,
      getUserRegToken: computed,

      setUniqueId: action,
      getUniqueId: computed,

      setRedirectUpdate: action,
      getRedirectUpdate: computed,

      setFirebaseToken: action,
      getFirebaseToken: computed,

      setClubId: action,
      getClubId: computed,

      setRefreshToken: action,
      getRefreshToken: computed,

      setUserRollNumber: action,
      getUserRollNumber: computed,

      setAppLoaded: action,
      getAppLoaded: computed,

      setLynxgpt: action,
      getLynxgpt: computed,

      setisCR: action,
      getisCR: computed,

      setIsCommon: action,
      getIsCommon: computed,
    });
  }
}

export const USER_STORE = new UserData();
