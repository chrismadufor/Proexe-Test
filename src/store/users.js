import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
  users: [],
  errorMessage: "",
};

const slice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    getUsers: (state, { payload }) => {
      state.users = payload;
    },
    createUser: (state, { payload }) => {
      state.users.push(payload);
    },
    updateUser: (state, { payload }) => {
      const index = state.users.findIndex((user) => user.id == payload.id);
      state.users[index].name = payload.data.name;
      state.users[index].email = payload.data.email;
    },
    deleteUser: (state, { payload }) => {
      state.users = state.users.filter((users) => users.id !== payload);
    },
  },
});

export const { getUsers, createUser, updateUser, deleteUser } = slice.actions;
export default slice.reducer;
export const getAllUsers = (state) => state.users;
