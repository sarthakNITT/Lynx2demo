import {action, computed, makeObservable, observable} from 'mobx';

class ClubUserStore {
  state = {
    // clubs details
    name: '',
    email: '',
    description: '',
    isAdmin: false,
    profilePic: '',
    followerCount: '',
    // club events
    upcomingEvents: [],
    liveEvents: [],
    pastEvents: [],
    // errors and loaders
    isError: false,
    errorText: '',
    isLoading: false,
    refresh: false,

    // all details
    clubDetail: {},

    // current page
    livePageShow: true,
  };

  reset = () => {
    this.state.name = '';
    this.state.email = '';
    this.state.description = '';
    this.state.isAdmin = false;
    this.state.profilePic = '';
    this.state.followerCount = '';
    this.state.upcomingEvents = [];
    this.state.liveEvents = [];
    this.state.pastEvents = [];
    this.state.isError = false;
    this.state.errorText = '';
    this.state.isLoading = false;
    this.state.refresh = false;
    this.state.clubDetail = {};
    this.state.livePageShow = true;
  };
  /*
    GETTERS
  */
  get getName() {
    return this.state.name;
  }
  get getEmail() {
    return this.state.email;
  }
  get getDescription() {
    return this.state.description;
  }
  get getIsAdmin() {
    return this.state.isAdmin;
  }
  get getFollowerCount() {
    return this.state.followerCount;
  }
  get getProfilePic() {
    return this.state.profilePic;
  }
  get getUpcomingEvents() {
    return this.state.upcomingEvents;
  }
  get getLiveEvents() {
    return this.state.liveEvents;
  }
  get getPastEvents() {
    return this.state.pastEvents;
  }
  get getIsError() {
    return this.state.isError;
  }
  get getErrorText() {
    return this.state.errorText;
  }
  get getIsLoading() {
    return this.state.isLoading;
  }
  get getRefresh() {
    return this.state.refresh;
  }

  get getClubDetail() {
    return this.state.clubDetail;
  }

  get getLivePageShow() {
    return this.state.livePageShow;
  }

  /*
    SETTERS
  */
  setName = name => {
    this.state.name = name;
  };
  setEmail = email => {
    this.state.email = email;
  };
  setDescription = desc => {
    this.state.description = desc;
  };
  setIsAdmin = isAdmin => {
    this.state.isAdmin = isAdmin;
  };
  setProfilePic = pic => {
    this.state.profilePic = pic;
  };
  setFollowerCount = count => {
    this.state.followerCount = count;
  };
  setUpcomingEvents = events => {
    this.state.upcomingEvents = events;
  };
  setLiveEvents = events => {
    this.state.liveEvents = events;
  };
  setPastEvents = events => {
    this.state.pastEvents = events;
  };
  setIsError = isError => {
    this.state.isError = isError;
  };
  setErrorText = errorText => {
    this.state.errorText = errorText;
  };
  setIsLoading = isLoading => {
    this.state.isLoading = isLoading;
  };
  setRefresh = refresh => {
    this.state.refresh = refresh;
  };
  setClubDetails = clubDetails => {
    this.state.name = clubDetails.name;
    this.state.email = clubDetails.email;
    this.state.description = clubDetails.description;
    this.state.isAdmin = clubDetails.is_admin;
    this.state.profilePic = clubDetails.profile_pic;
    this.state.followerCount = clubDetails.followers_count;
  };

  setClubInfo = val => {
    this.state.clubDetail = val;
  };

  setLivePageShow = bool => {
    this.state.livePageShow = bool;
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      // setters
      setName: action,
      setEmail: action,
      setDescription: action,
      setIsAdmin: action,
      setProfilePic: action,
      setFollowerCount: action,
      setUpcomingEvents: action,
      setLiveEvents: action,
      setPastEvents: action,
      setIsError: action,
      setErrorText: action,
      setIsLoading: action,
      setClubDetails: action,
      setRefresh: action,
      setClubInfo: action,
      setLivePageShow: action,
      // getters
      getName: computed,
      getEmail: computed,
      getDescription: computed,
      getIsAdmin: computed,
      getFollowerCount: computed,
      getProfilePic: computed,
      getUpcomingEvents: computed,
      getLiveEvents: computed,
      getPastEvents: computed,
      getIsError: computed,
      getErrorText: computed,
      getIsLoading: computed,
      getRefresh: computed,
      getClubDetail: computed,
      getLivePageShow: computed,
    });
  }
}

export const CLUB_USER_STORE = new ClubUserStore();
