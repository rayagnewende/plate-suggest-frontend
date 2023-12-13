import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "Rich",
    email: null,
    password: null,
    token: null,
    preferences: {
      regime: "",
      illnesses: [],
      ingredients: [],
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {},
    login: (state, action) => {},
    logout: (state) => {},
    selectRegime: (state, action) => {
      state.value.preferences.regime = action.payload;
    },
    updateRegime: (state, action) => {},
    deleteRegime: (state, action) => {},
    addIllnesses: (state, action) => {
      state.value.preferences.illnesses.push(action.payload);
    },
    deleteIllness: (state, action) => {
      state.value.preferences.illnesses =
        state.value.preferences.illnesses.filter(
          (element) => element !== action.payload
        );
    },
    addIngredient: (state, action) => {
      state.value.preferences.ingredients.push(action.payload);
    },
    deleteIngredient: (state, action) => {
      state.value.preferences.ingredients =
        state.value.preferences.ingredients.filter(
          (element) => element !== action.payload
        );
    },
  },
});

export const {
  register,
  login,
  logout,
  selectRegime,
  addIllnesses,
  addIngredient,
  updateRegime,
  deleteRegime,
  deleteIllness,
  deleteIngredient,
} = userSlice.actions;
export default userSlice.reducer;
