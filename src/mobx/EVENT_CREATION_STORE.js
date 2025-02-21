import {action, computed, makeObservable, observable} from 'mobx';
import {
  formatToIndiaTime,
  getIndiaTime,
  getTomorrow,
} from '../utils/helperFunction/getFormattedTime';
import {EVENT_DESC_MAX_SIZE, EVENT_TITLE_MAX_SIZE} from '../utils/UI_CONSTANTS';

class eventCreationStore {
  state = {
    title: '',
    desc: '',
    link: '',
    links: [],
    tag: '',
    tags: [],
    startEvent: getIndiaTime(new Date()),
    endEvent: getIndiaTime(getTomorrow(new Date())),
    startEventIST: formatToIndiaTime(new Date()),
    endEventIST: formatToIndiaTime(new Date()),
    showStartPicker: false,
    showEndPicker: false,

    eventsPic: '',
    isProfilePictureSelected: false,

    images: [null],
    charLeftTitle: EVENT_TITLE_MAX_SIZE,
    charLeftDesc: EVENT_DESC_MAX_SIZE,

    isError: false,
    errorText: '',
    loading: false,
    success: false,
    titleError: 1,
    descError: 1,
    imageError: false,
    dateError: 0,
  };

  setSuccess = val => {
    this.state.success = val;
  };
  get getSuccess() {
    return this.state.success;
  }

  addImage = image => {
    this.state.images = [
      ...this.state.images,
      {uri: image.uri, type: image.type, name: image.name},
    ];
  };
  removeImage = rmIndex => {
    //console.log("INDEX"+index+"SPLICE"+this.state.images.splice(index,1))
    this.state.images = this.state.images.filter((item, index) => {
      return rmIndex != index;
    });
  };
  get getImages() {
    return this.state.images;
  }

  setEventsPic = val => {
    this.state.eventsPic = val;
  };
  get getEventsPic() {
    return this.state.eventsPic;
  }

  setTitle = val => {
    this.state.title = val;
    this.setCharLeftTitle(EVENT_TITLE_MAX_SIZE - this.state.title.length);
  };
  get getTitle() {
    return this.state.title;
  }

  setDesc = val => {
    this.state.desc = val;
    this.setCharLeftDesc(EVENT_DESC_MAX_SIZE - this.state.desc.length);
  };
  get getDesc() {
    return this.state.desc;
  }

  setLink = val => {
    this.state.link = val;
  };
  get getLink() {
    return this.state.link;
  }

  setTag = val => {
    this.state.tag = val;
  };
  get getTag() {
    return this.state.tag;
  }

  setStartEvent = val => {
    this.state.startEvent = val || this.state.startEvent;
    this.state.startEventIST = formatToIndiaTime(this.state.startEvent);
    this.setShowStartPicker(false);

    const currentDate = new Date();
    if (this.state.startEventIST.getTime() < currentDate.getTime()) {
      this.setDateError(2);
      console.log('er');
    } else if (this.state.startEvent.getTime() >= this.state.endEvent.getTime())
      this.setDateError(1);
    else this.setDateError(0);
  };
  get getStartEvent() {
    return this.state.startEvent;
  }
  get getStartEventIST() {
    return this.state.startEventIST;
  }

  setEndEvent = val => {
    this.state.endEvent = val || this.state.endEvent;
    this.state.endEventIST = formatToIndiaTime(this.state.endEvent);
    this.setShowEndPicker(false);
    if (this.state.startEvent.getTime() >= this.state.endEvent.getTime())
      this.setDateError(1);
    else this.setDateError(0);
  };
  get getEndEvent() {
    return this.state.endEvent;
  }
  get getEndEventIST() {
    return this.state.endEventIST;
  }

  addLink = () => {
    this.state.links = [...this.state.links, this.state.link];
    this.setLink('');
  };
  removeLink = rmIndex => {
    this.state.links = this.state.links.filter((item, index) => {
      return rmIndex != index;
    });
  };
  get getLinks() {
    return this.state.links;
  }

  addTag = () => {
    this.state.tags = [...this.state.tags, this.state.tag];
    this.setTag('');
  };
  removeTag = rmIndex => {
    this.state.tags = this.state.tags.filter((item, index) => {
      return rmIndex != index;
    });
  };
  get getTags() {
    return this.state.tags;
  }

  setShowStartPicker = val => {
    this.state.showStartPicker = val;
  };
  get getShowStartPicker() {
    return this.state.showStartPicker;
  }

  setShowEndPicker = val => {
    this.state.showEndPicker = val;
  };
  get getShowEndPicker() {
    return this.state.showEndPicker;
  }

  setProfilePictureSelected = val => {
    this.state.isProfilePictureSelected = val;
  };
  get getProfilePictureSelected() {
    return this.state.isProfilePictureSelected;
  }

  setIsError = val => {
    this.state.isError = val;
  };
  get getError() {
    return this.state.isError;
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

  setCharLeftTitle = left => {
    this.state.charLeftTitle = left;
    if (this.state.charLeftTitle < 0) this.setTitleError(2);
    else if (this.state.charLeftTitle === EVENT_TITLE_MAX_SIZE)
      this.setTitleError(1);
    else this.setTitleError(0);
  };
  setTitleError = error => {
    this.state.titleError = error;
  };
  get getCharLeftTitle() {
    return this.state.charLeftTitle;
  }
  get getTitleError() {
    return this.state.titleError;
  }

  setCharLeftDesc = left => {
    this.state.charLeftDesc = left;
    if (this.state.charLeftDesc < 0) this.setDescError(2);
    else if (this.state.charLeftDesc === EVENT_DESC_MAX_SIZE)
      this.setDescError(1);
    else this.setDescError(0);
  };
  setDescError = error => {
    this.state.descError = error;
  };
  get getCharLeftDesc() {
    return this.state.charLeftDesc;
  }
  get getDescError() {
    return this.state.descError;
  }

  setImageError = error => {
    this.state.imageError = error;
  };
  get getImageError() {
    return this.state.imageError;
  }

  setDateError = error => {
    this.state.dateError = error;
  };
  get getDateError() {
    return this.state.dateError;
  }

  clearData() {
    this.state.title = '';
    this.state.desc = '';
    this.state.link = '';
    this.state.links = [];
    this.state.tag = '';
    this.state.tags = [];
    this.state.startEvent = getIndiaTime(new Date());

    this.state.endEvent = getIndiaTime(getTomorrow(new Date()));

    this.state.startEventIST = formatToIndiaTime(new Date());
    this.state.endEventIST = formatToIndiaTime(new Date());

    this.state.showStartPicker = false;
    this.state.showEndPicker = false;
    this.state.eventsPic = '';
    this.state.isProfilePictureSelected = false;
    this.state.images = [null];
    this.state.charLeftTitle = EVENT_TITLE_MAX_SIZE;
    this.state.charLeftDesc = EVENT_DESC_MAX_SIZE;
    this.state.isError = false;
    this.state.errorText = '';
    this.state.loading = false;
    this.state.titleError = 1;
    this.state.descError = 1;
    this.state.imageError = false;
    this.state.dateError = 0;
    this.state.success = false;
  }

  constructor() {
    this.state.startEvent.setHours(this.state.startEvent.getHours() + 1);
    this.state.endEvent.setDate(this.state.startEvent.getDate() + 2);
    makeObservable(this, {
      state: observable,

      setIsError: action,
      getError: computed,

      setTitle: action,
      getTitle: computed,

      setDesc: action,
      getDesc: computed,

      setLink: action,
      getLink: computed,

      setTag: action,
      getTag: computed,

      setStartEvent: action,
      getStartEvent: computed,

      getStartEventIST: computed,
      getEndEventIST: computed,

      setEndEvent: action,
      getEndEvent: computed,

      addLink: action,
      removeLink: action,
      getLinks: computed,

      setEventsPic: action,
      getEventsPic: computed,

      addImage: action,
      getImages: computed,
      removeImage: action,

      addTag: action,
      removeTag: action,
      getTags: computed,

      setShowStartPicker: action,
      getShowStartPicker: computed,

      setShowEndPicker: action,
      getShowEndPicker: computed,

      setProfilePictureSelected: action,
      getProfilePictureSelected: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setSuccess: action,
      getSuccess: computed,

      setCharLeftTitle: action,
      setTitleError: action,
      setCharLeftDesc: action,
      setDescError: action,
      getCharLeftTitle: computed,
      getTitleError: computed,
      getCharLeftDesc: computed,
      getDescError: computed,

      clearData: action,

      setImageError: action,
      getImageError: computed,
    });
  }
}

export const EVENT_CREATION_STORE = new eventCreationStore();
