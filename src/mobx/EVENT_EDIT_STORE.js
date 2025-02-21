import {action, computed, makeObservable, observable} from 'mobx';
import {
  formatToIndiaTime,
  getIndiaTime,
} from '../utils/helperFunction/getFormattedTime';
import {EVENT_DESC_MAX_SIZE, EVENT_TITLE_MAX_SIZE} from '../utils/UI_CONSTANTS';

class EventEditStore {
  state = {
    // input state variables
    editTitle: '',
    editDesc: '',
    editLink: '',
    editLinks: [],
    editTag: '',
    editTags: [],
    editStartEvent: new Date(),
    editEndEvent: new Date(),
    editStartEventIST: formatToIndiaTime(new Date()),
    editEndEventIST: formatToIndiaTime(new Date()),
    showStartPicker: false,
    showEndPicker: false,
    eventid: '',

    // photos
    photos: [],
    charLeftTitle: EVENT_TITLE_MAX_SIZE,
    charLeftDesc: EVENT_DESC_MAX_SIZE,

    // loader and error state variables
    success: false,
    isError: false,
    errorText: '',
    isLoading: false,
    titleError: 1,
    descError: 1,
    isViewingImg: false,
  };

  /* 
    GETTERS
  */

  // FOR INPUT STATE VARIABLES
  get getEditTitle() {
    return this.state.editTitle;
  }
  get getEditDesc() {
    return this.state.editDesc;
  }
  get getEditLink() {
    return this.state.editLink;
  }
  get getEditLinks() {
    return this.state.editLinks;
  }
  get getEditTag() {
    return this.state.editTag;
  }
  get getEditTags() {
    return this.state.editTags;
  }
  get getEditStartEvent() {
    return this.state.editStartEvent;
  }
  get getEditStartEventIST() {
    return this.state.editStartEventIST;
  }
  get getEditEndEvent() {
    return this.state.editEndEvent;
  }
  get getEditEndEventIST() {
    return this.state.editEndEventIST;
  }
  get getShowStartPicker() {
    return this.state.showStartPicker;
  }
  get getShowEndPicker() {
    return this.state.showEndPicker;
  }
  get getEventId() {
    return this.state.eventid;
  }

  // FOR OTHERS
  get getPhotos() {
    return this.state.photos;
  }
  get getCharLeftTitle() {
    return this.state.charLeftTitle;
  }
  get getCharLeftDesc() {
    return this.state.charLeftDesc;
  }

  // FOR ERROR AND LOADERS
  get getIsSuccess() {
    return this.state.success;
  }

  get getIsError() {
    return this.state.isError;
  }
  get getIsLoading() {
    return this.state.isLoading;
  }
  get getErrorText() {
    return this.state.errorText;
  }
  get getTitleError() {
    return this.state.titleError;
  }
  get getDescError() {
    return this.state.descError;
  }
  get getIsViewingImg() {
    return this.state.isViewingImg;
  }

  /*
    SETTERS
  */

  // FOR INPUT STATE VARIABLES
  setEditTitle = title => {
    //this.state.editTitle = title;
    this.state.editTitle = title || ''; 
    this.setCharLeftTitle(EVENT_TITLE_MAX_SIZE - this.state.editTitle.length);
  };
  setEditDesc = desc => {
    //this.state.editDesc = desc;
    this.state.editDesc = desc || '';
    this.setCharLeftDesc(EVENT_DESC_MAX_SIZE - this.state.editDesc.length);
  };
  setEditLink = link => {
    this.state.editLink = link;
  };
  addLink = () => {
    this.state.editLinks = [...this.state.editLinks, this.state.editLink];
    this.state.editLink = '';
  };
  removeLink = rmIndex => {
    this.state.editLinks = this.state.editLinks.filter((currLink, index) => {
      return index !== rmIndex;
    });
  };
  setEditTag = tag => {
    this.state.editTag = tag;
  };
  addTag = () => {
    this.state.editTags = [...this.state.editTags, this.state.editTag];
    this.state.editTag = '';
  };
  removeTag = rmIndex => {
    this.state.editTags = this.state.editTags.filter((currTag, index) => {
      return index !== rmIndex;
    });
  };
  setEditStartEvent = dateTime => {
    this.setShowStartPicker(false);
    this.state.editStartEvent = dateTime || this.state.editStartEvent;
    this.state.editStartEventIST =
      formatToIndiaTime(dateTime) || this.state.editStartEventIST;
  };
  setEditEndEvent = dateTime => {
    this.setShowEndPicker(false);
    this.state.editEndEvent = dateTime || this.state.editEndEvent;
    this.state.editEndEventIST =
      formatToIndiaTime(dateTime) || this.state.editEndEventIST;
  };
  setShowStartPicker = bool => {
    this.state.showStartPicker = bool;
  };
  setShowEndPicker = bool => {
    this.state.showEndPicker = bool;
  };
  setEditLinks = links => {
    this.state.editLinks = links;
  };
  setEditTags = tags => {
    this.state.editTags = tags;
  };
  setEventId = id => {
    this.state.eventid = id;
  };

  // OTHERS
  setPhotos = photos => {
    this.state.photos = photos;
  };
  setCharLeftTitle = left => {
    this.state.charLeftTitle = left;
    if (this.state.charLeftTitle < 0) this.setTitleError(2);
    else if (this.state.charLeftTitle === EVENT_TITLE_MAX_SIZE)
      this.setTitleError(1);
    else this.setTitleError(0);
  };
  setCharLeftDesc = left => {
    this.state.charLeftDesc = left;
    if (this.state.charLeftDesc < 0) this.setDescError(2);
    else if (this.state.charLeftDesc === EVENT_DESC_MAX_SIZE)
      this.setDescError(1);
    else this.setDescError(0);
  };

  // FOR ERROR AND LOADERS
  setSuccess = isSuccess => {
    this.state.success = isSuccess;
  };

  setIsError = isError => {
    this.state.isError = isError;
  };
  setIsLoading = isLoading => {
    this.state.isLoading = isLoading;
  };
  setErrorText = errorText => {
    this.state.errorText = errorText;
  };
  setTitleError = err => {
    this.state.titleError = err;
  };
  setDescError = err => {
    this.state.descError = err;
  };
  setIsViewingImg = isViewing => {
    this.state.isViewingImg = isViewing;
  };

  clearData = () => {
    this.state.editTitle = '';
    this.state.editDesc = '';
    this.state.editLink = '';
    this.state.editLinks = [];
    this.state.editTag = '';
    this.state.editTags = [];
    this.state.editStartEvent = new Date();
    this.state.editEndEvent = new Date();
    this.state.editStartEventIST = formatToIndiaTime(new Date());
    this.state.editEndEventIST = formatToIndiaTime(new Date());
    this.state.showStartPicker = false;
    this.state.showEndPicker = false;
    this.state.eventid = '';
    this.state.photos = [];
    this.state.charLeftTitle = EVENT_TITLE_MAX_SIZE;
    this.state.charLeftDesc = EVENT_DESC_MAX_SIZE;
    this.state.success = false;
    this.state.isError = false;
    this.state.errorText = '';
    this.state.isLoading = false;
    this.state.titleError = 1;
    this.state.descError = 1;
    this.state.isViewingImg = false;
  };

  setData = data => {
    this.setEditTitle(data.Title);
    this.setEditDesc(data.Description);
    this.state.editLinks = data.links;
    this.state.editTags = data.tags;
    this.setEditStartEvent(getIndiaTime(new Date(data.startDate)));
    this.setEditEndEvent(getIndiaTime(new Date(data.endDate)));
    this.state.photos = data.photos;
    this.state.isViewingImg = false;
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      // setters
      setEditTitle: action,
      setEditDesc: action,
      setEditLink: action,
      addLink: action,
      removeLink: action,
      setEditTag: action,
      addTag: action,
      removeTag: action,
      setEditStartEvent: action,
      setEditEndEvent: action,
      setPhotos: action,
      setIsError: action,
      setIsLoading: action,
      setErrorText: action,
      setCharLeftTitle: action,
      setCharLeftDesc: action,
      setTitleError: action,
      setDescError: action,
      setShowStartPicker: action,
      setShowEndPicker: action,
      clearData: action,
      setData: action,
      setIsViewingImg: action,
      setSuccess: action,
      setEventId: action,
      // getters
      getEditTitle: computed,
      getEditDesc: computed,
      getEditLink: computed,
      getEditLinks: computed,
      getEditTag: computed,
      getEditTags: computed,
      getEditStartEvent: computed,
      getEditEndEvent: computed,
      getPhotos: computed,
      getIsError: computed,
      getErrorText: computed,
      getIsLoading: computed,
      getCharLeftTitle: computed,
      getCharLeftDesc: computed,
      getTitleError: computed,
      getDescError: computed,
      getShowStartPicker: computed,
      getShowEndPicker: computed,
      getIsViewingImg: computed,
      getIsSuccess: computed,
      getEventId: computed,
      getEditStartEventIST: computed,
      getEditEndEventIST: computed,
    });
  }
}

export const EVENT_EDIT_STORE = new EventEditStore();
