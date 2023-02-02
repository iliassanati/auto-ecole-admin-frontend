import axios from 'axios';
import {
  NEWS_CREATE_FAIL,
  NEWS_CREATE_REQUEST,
  NEWS_CREATE_SUCCESS,
  NEWS_DELETE_FAIL,
  NEWS_DELETE_REQUEST,
  NEWS_DELETE_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_UPDATE_FAIL,
  NEWS_UPDATE_REQUEST,
  NEWS_UPDATE_SUCCESS,
} from '../constants/newsConstants';

export const createNews =
  (type, titre, contenu) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NEWS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/news/create`,
        {
          type,
          titre,
          contenu,
        },
        config
      );

      dispatch({ type: NEWS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NEWS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const allNewsList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEWS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/news`, config);

    dispatch({
      type: NEWS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: NEWS_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateNews = (id, news) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEWS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/news/${id}`, news, config);

    dispatch({ type: NEWS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: NEWS_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteNews = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEWS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/news/${id}`, config);

    dispatch({ type: NEWS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: NEWS_DELETE_FAIL,
      payload: message,
    });
  }
};
