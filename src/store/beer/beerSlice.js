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
    getBeersFailure(state, action){
      state.isLoading = false;
      state.error = action.payload;
    },
    getBeersSuccess(state, { payload: { beers, page }, }) {
      state.beers =   state.beers.concat(beers);
      state.isLoading = false;
      state.error = null;
      state.page = page;
      state.hasMore = beers.length >= BEER_PER_PAGE;
    },

  }
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

export default beers.reducer;
