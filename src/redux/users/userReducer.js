import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESSFUL,
  FETCH_USERS_ERROR,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from "./userTypes";

const INITIAL_STATE = {
  loading: false,
  users: [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
    {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      address: {
        street: "Douglas Extension",
        suite: "Suite 847",
        city: "McKenziehaven",
        zipcode: "59590-4157",
        geo: {
          lat: "-68.6102",
          lng: "-47.0653",
        },
      },
      phone: "1-463-123-4447",
      website: "ramiro.info",
      company: {
        name: "Romaguera-Jacobson",
        catchPhrase: "Face to face bifurcated interface",
        bs: "e-enable strategic applications",
      },
    },
  ],
  errorMessage: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload, id } = action;

  switch (type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        users: payload,
        errorMessage: "",
      };

    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        users: [],
        errorMessage: payload,
      };

    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, payload],
        errorMessage: "",
      };

    case UPDATE_USER:
      return {
        ...state,
        users: [
          ...state.users,
          ...(state.users[id].name = payload.name),
          ...(state.users[id].email = payload.email),
        ],
        errorMessage: "",
      };

    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user.id !== payload)],
        errorMessage: "",
      };

    default:
      return state;
  }
};
