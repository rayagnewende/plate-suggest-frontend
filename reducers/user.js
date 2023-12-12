import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
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
    register: (state, action) => {
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      state.value.token = action.payload.token;
    },
    login: (state, action) => {},
    logout: (state) => {
      state.value.token = null;
    },
    addRegime: (state, action) => {},
    updateRegime: (state, action) => {},
    deleteRegime: (state, action) => {},
    addIllnesses: (state, action) => {},
    deleteIllness: (state, action) => {},
    addIngredient: (state, action) => {},
    deleteIngredient: (state, action) => {},
  },
});

export const {
  register,
  login,
  logout,
  addRegime,
  addIllnesses,
  addIngredient,
  updateRegime,
  deleteRegime,
  deleteIllness,
  deleteIngredient,
} = userSlice.actions;
export default userSlice.reducer;
