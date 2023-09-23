import { createSlice } from '@reduxjs/toolkit';
import appApi from '../services/appApi';

export const useSlice = createSlice ({
  name: 'user',
  initialState: null,
  reducers: {
    addNotifications: (state, { payload }) => {
        if (state.newMessages[payload]) {
             state.newMessages[payload] = state.newMessages[payload] + 1;
    } else {
        state.newMessages[payload] = 1;
    }
  },
  resetNotifications: (state, { payload }) => {
    delete state.newMessages[payload];
    },
  },

  extraReducers: (builder) => {
    //SAVE USER AFTER SIGNING UP
    builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, {payload}) => payload);
    //SAVE USER AFTER LOGGING IN
    builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, {payload}) => payload);
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
  },
});

export const { addNotifications, resetNotifications } = useSlice.actions;
export default useSlice.reducer;