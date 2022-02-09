import axios from "axios";
import http from "../../http-common";

const action = {
  type: "apiCallBegan",
  payload: {
    url: "/data",
    method: "get",
    data: {},
    onSuccess: "usersFetched",
    onError: "usersFetchedFailed",
  },
};

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== "apiCallBegan") return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL:
          "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb",
        url,
        method,
        data,
      });
      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch({ type: onError, payload: error });
    }
  };

export default api;
