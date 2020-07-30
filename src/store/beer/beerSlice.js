import { createSlice } from '@reduxjs/toolkit';

import * as Api from '../../api';

const BEER_PER_PAGE = 15;

const beers = createSlice({
  name: 'beers',
  initialState: {
    beers: [],
    page: 1,
    hasMore: true,
    isLoading: false,
  },
  reducers: {
    getBeersStart(state) {
      state.isLoading = true;
    },
    getBeersFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBeersSuccess(state, { payload: { beers, page } }) {
      state.beers = state.beers.concat(beers);
      state.isLoading = false;
      state.error = null;
      state.page = page;
      state.hasMore = beers.length >= BEER_PER_PAGE;
    },
  },
});

export const {
  getBeersStart,
  getBeersFailure,
  getBeersSuccess,
} = beers.actions;

export const fetchBeers = (page = 1) => async (dispatch) => {
  try {
    dispatch(getBeersStart());
    const beers = await Api.getBeers(page);
    dispatch(getBeersSuccess({ beers, page }));
  } catch (err) {
    dispatch(getBeersFailure(err.toString()));
  }
};

// Conditions to load data
// Server: These should always be met by server initial state
// Client: These conditions will be met on first load of page
export const fetchBeersIfNeeded = () => async (dispatch, getState) => {
  const beersState = getState().beers;
  const { beers, isLoading } = beersState;
  if (beers.length === 0 && !isLoading) {
    await dispatch(fetchBeers());
  }
};

export default beers.reducer;
