import {action, computed, makeObservable, observable} from 'mobx';
import {
  MAX_CALENDAR_NOTICE_DESCRIPTION,
  MAX_CALENDAR_NOTICE_TITLE,
} from '../utils/UI_CONSTANTS';

class calendarNoticeStore {
  state = {
    error: false,
    errorText: '',
    loading: false,
    success: false,
    title: '',
    description: '',
    //start Date can be from current date (Backend accepts current date as start date as well, time doesnt matter)
    startDate: new Date(),
    //end Date can be from one day after current date
    endDate: new Date(new Date().getTime() + 1 * 86400000),
    showStartDatePicker: false,
    showEndDatePicker: false,
    multiDay: false,

    titleError: 1,
    charLeftTitle: MAX_CALENDAR_NOTICE_TITLE,

    descError: 1,
    charLeftDesc: MAX_CALENDAR_NOTICE_DESCRIPTION,

    dateError: 0,
  };
  reset = () => {
    this.state.error = false;
    this.state.errorText = '';
    this.state.loading = false;
    this.state.success = false;
    this.state.title = '';
    this.state.description = '';
    this.state.startDate = new Date();
    this.state.endDate = new Date(new Date().getTime() + 1 * 86400000);
    this.state.showStartDatePicker = false;
    this.state.showEndDatePicker = false;
    this.state.multiDay = false;
    this.state.titleError = 1;
    this.state.charLeftTitle = MAX_CALENDAR_NOTICE_TITLE;
    this.state.descError = 1;
    this.state.charLeftDesc = MAX_CALENDAR_NOTICE_DESCRIPTION;
    this.state.dateError = 0;
  };
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

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  setTitle = val => {
    this.state.title = val;
    this.setCharLeftTitle(MAX_CALENDAR_NOTICE_TITLE - this.state.title.length);
  };

  get getTitle() {
    return this.state.title;
  }

  setDescription = val => {
    this.state.description = val;
    this.setCharLeftDesc(
      MAX_CALENDAR_NOTICE_DESCRIPTION - this.state.description.length,
    );
  };

  get getDescription() {
    return this.state.description;
  }

  setStartDate = val => {
    this.state.startDate = val || this.state.startDate;
    this.setShowStartDatePicker(false);

    const currentDate = new Date();
    // If start date is less than current date
    if (this.state.startDate.getTime() < currentDate.getTime()) {
      //this.setDateError(2);
    }
    // If multi day notice and start date is greater than end date
    else if (
      this.state.multiDay &&
      this.state.startDate.getTime() > this.state.endDate.getTime()
    )
      this.setDateError(1);
    // If start date and end date is same, make it a single day event
    else if (this.state.startDate.getTime() == this.state.endDate.getTime()) {
      this.setMultiDay(false);
      this.setDateError(0);
    } else this.setDateError(0);
  };

  get getStartDate() {
    return this.state.startDate;
  }

  setEndDate = val => {
    this.state.endDate = val || this.state.endDate;
    this.setShowEndDatePicker(false);

    // If start date is greater than end date
    if (this.state.startDate.getTime() > this.state.endDate.getTime())
      this.setDateError(1);
    // If start date and end date is same, make it a single day event
    else if (this.state.startDate.getTime() == this.state.endDate.getTime()) {
      this.setMultiDay(false);
      this.setDateError(0);
    } else this.setDateError(0);
  };

  get getEndDate() {
    return this.state.endDate;
  }

  setShowStartDatePicker = val => {
    this.state.showStartDatePicker = val;
  };

  get getShowStartDatePicker() {
    return this.state.showStartDatePicker;
  }

  setShowEndDatePicker = val => {
    this.state.showEndDatePicker = val;
  };

  get getShowEndDatePicker() {
    return this.state.showEndDatePicker;
  }

  setMultiDay = val => {
    this.state.multiDay = val;

    if (this.state.multiDay) {
      const currentDate = new Date();
      // If start date is less than current date
      if (this.state.startDate.getTime() < currentDate.getTime()) {
        // this.setDateError(2);
      }
      //If start date is same or more than end date when multi day switch is turned on,make end date one more than start date
      else if (this.state.startDate.getTime() >= this.state.endDate.getTime()) {
        this.setEndDate(new Date(this.state.startDate.getTime() + 86400000));
      } else {
        this.setDateError(0);
      }
    } else {
      const currentDate = new Date();
      // If start date is less than current date
      if (this.state.startDate.getTime() < currentDate.getTime()) {
        // this.setDateError(2);
      } else {
        this.setDateError(0);
      }
    }
  };

  get getMultiDay() {
    return this.state.multiDay;
  }

  setTitleError = error => {
    this.state.titleError = error;
  };
  get getTitleError() {
    return this.state.titleError;
  }

  setCharLeftTitle = left => {
    this.state.charLeftTitle = left;
    if (this.state.charLeftTitle < 0) this.setTitleError(2);
    else if (this.state.charLeftTitle === MAX_CALENDAR_NOTICE_TITLE)
      this.setTitleError(1);
    else this.setTitleError(0);
  };
  get getCharLeftTitle() {
    return this.state.charLeftTitle;
  }

  setDescError = error => {
    this.state.descError = error;
  };
  get getDescError() {
    return this.state.descError;
  }

  setCharLeftDesc = left => {
    this.state.charLeftDesc = left;
    if (this.state.charLeftDesc < 0) this.setDescError(2);
    else if (this.state.charLeftDesc === MAX_CALENDAR_NOTICE_DESCRIPTION)
      this.setDescError(1);
    else this.setDescError(0);
  };
  get getCharLeftDesc() {
    return this.state.charLeftDesc;
  }

  setDateError = error => {
    this.state.dateError = error;
  };
  get getDateError() {
    return this.state.dateError;
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

      setSuccess: action,
      getSuccess: computed,

      setTitle: action,
      getTitle: computed,

      setDescription: action,
      getDescription: computed,

      setStartDate: action,
      getStartDate: computed,

      setEndDate: action,
      getEndDate: computed,

      setShowStartDatePicker: action,
      getShowStartDatePicker: computed,

      setShowEndDatePicker: action,
      getShowEndDatePicker: computed,

      setMultiDay: action,
      getMultiDay: computed,

      setTitleError: action,
      getTitleError: computed,

      setCharLeftTitle: action,
      getCharLeftTitle: computed,

      setDescError: action,
      getDescError: computed,

      setCharLeftDesc: action,
      getCharLeftDesc: computed,

      setDateError: action,
      getDateError: computed,
    });
  }
}

export const CALENDAR_NOTICE_STORE = new calendarNoticeStore();
