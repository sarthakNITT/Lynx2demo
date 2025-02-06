import { action, computed, makeObservable, observable } from 'mobx';

class lynxgptQuery {
    state = {
        error: true,
        errorText: '',
        loading: true,
        success: false,
        data: {
            message: '',
        },
        refreshing: false,
        query: '',
        n: 5,
    };

    reset = () => {
        this.state.error = true;
        this.state.errorText = '';
        this.state.loading = true;
        this.state.success = false;
        this.state.data = {};
        this.state.refreshing = false;
        this.state.query = '';
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

    setQuery = val => {
        this.state.query = val;
    };

    get getQuery() {
        return this.state.query;
    }

    setN = val => {
        this.state.n = val;
    };

    get getN() {
        return this.state.n;
    }

    constructor() {
        makeObservable(this, {
            state: observable,
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

            setQuery: action,
            getQuery: computed,

            setN: action,
            getN: computed,

            reset: action,
        });
    }
}

export const LYNXGPT_QUERY = new lynxgptQuery();
