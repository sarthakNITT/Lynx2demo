import {action, computed, makeObservable, observable} from 'mobx';

class clubDescriptionStore {
  state = {
    error: true,
    errorText: '',
    loading: true,
    success: false,
    data: '',
    liveEvents: '',
    upcomingEvents: '',
    circulars: '',
    pastEvents: '',
    clubID: '',
    refreshing: false,
    isFollowingClub: false,
    fromEventDescriptionScreen: false,
  };
  reset = () => {
    this.state.fromEventDescriptionScreen = false;
    this.state.error = true;
    this.state.errorText = '';
    this.state.loading = true;
    this.state.success = false;
    this.state.data = '';
    this.state.liveEvents = '';
    this.state.upcomingEvents = '';
    this.state.pastEvents = '';
    this.state.clubID = '';
    this.state.refreshing = false;
    this.state.isFollowingClub = false;
  };

  setRefreshing = val => {
    this.state.refreshing = val;
  };

  get getRefreshing() {
    return this.state.refreshing;
  }

  setFromEventScreen = val => {
    this.state.fromEventDescriptionScreen = val;
  };

  get getFromEventScreen() {
    return this.state.fromEventDescriptionScreen;
  }

  setIsFollowingClub = val => {
    this.state.isFollowingClub = val;
  };

  get getIsFollowingClub() {
    return this.state.isFollowingClub;
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

  setLiveEvents = val => {
    this.state.liveEvents = val;
  };

  get getLiveEvents() {
    return this.state.liveEvents;
  }

  setUpcomingEvents = val => {
    this.state.upcomingEvents = val;
  };

  get getUpcomingEvents() {
    return this.state.upcomingEvents;
  }

  setCircular = val => {
    this.state.circulars = val;
  };

  get getCirculars() {
    return this.state.circulars;
  }

  setPastEvents = val => {
    this.state.pastEvents = val;
  };

  get getPastEvents() {
    return this.state.pastEvents;
  }

  setID = val => {
    this.state.clubID = val;
  };

  get getID() {
    return this.state.clubID;
  }

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  setIncrementFollower = () => {
    console.log(this.state.data.followers_count);
    this.state.data.followers_count = this.state.data.followers_count + 1;
  };
  setDecrementFollower = () => {
    console.log(this.state.data.followers_count);
    this.state.data.followers_count = this.state.data.followers_count - 1;
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setIncrementFollower: action,

      setDecrementFollower: action,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setData: action,
      getData: computed,

      setLiveEvents: action,
      getLiveEvents: computed,

      setUpcomingEvents: action,
      getUpcomingEvents: computed,

      setCircular: action,
      getCirculars: computed,

      setPastEvents: action,
      getPastEvents: computed,

      setSuccess: action,
      getSuccess: computed,

      setRefreshing: action,
      getRefreshing: computed,

      setID: action,
      getID: computed,

      setIsFollowingClub: action,
      getIsFollowingClub: computed,

      setFromEventScreen: action,
      getFromEventScreen: computed,
    });
  }
}

export const CLUB_DESCRIPTION_STORE = new clubDescriptionStore();
