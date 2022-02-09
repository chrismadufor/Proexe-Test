import { configureStore } from "@reduxjs/toolkit";
import reducer from "./users";
// import api from "./middleware/api";

export default function configureAppStore() {
  return configureStore({
    reducer,
    // middleware: [api],
  });
}
