import {
  NEWS_CREATE_FAIL,
  NEWS_CREATE_REQUEST,
  NEWS_CREATE_RESET,
  NEWS_CREATE_SUCCESS,
  NEWS_DELETE_FAIL,
  NEWS_DELETE_REQUEST,
  NEWS_DELETE_RESET,
  NEWS_DELETE_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_RESET,
  NEWS_LIST_SUCCESS,
  NEWS_UPDATE_FAIL,
  NEWS_UPDATE_REQUEST,
  NEWS_UPDATE_RESET,
  NEWS_UPDATE_SUCCESS,
} from '../constants/newsConstants';

export const newsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWS_CREATE_REQUEST:
      return { loading: true };

    case NEWS_CREATE_SUCCESS:
      return {
        loading: false,
        news: action.payload,
        success: true,
      };

    case NEWS_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEWS_CREATE_RESET:
      return {
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export const newsDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWS_DELETE_REQUEST:
      return {
        loading: true,
      };

    case NEWS_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case NEWS_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEWS_DELETE_RESET:
      return {
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export const newsListReducer = (state = { allNews: [] }, action) => {
  switch (action.type) {
    case NEWS_LIST_REQUEST:
      return {
        loading: true,
      };

    case NEWS_LIST_SUCCESS:
      return {
        loading: false,
        allNews: action.payload,
      };

    case NEWS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEWS_LIST_RESET:
      return {
        allNews: [],
      };
    default:
      return state;
  }
};

export const newsUpdateReducer = (state = { news: {} }, action) => {
  switch (action.type) {
    case NEWS_UPDATE_REQUEST:
      return {
        loading: true,
      };

    case NEWS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case NEWS_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEWS_UPDATE_RESET:
      return {
        news: {},
      };
    default:
      return state;
  }
};
