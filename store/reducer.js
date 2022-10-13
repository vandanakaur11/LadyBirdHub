export const initialState = {
  users: [],
  blogs: [],
  userData: '',
  getuser_token: '',
  allCategories: [],
  // medias: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ALL_BLOGS':
      return {
        ...state,
        blogs: action.payload,
      };
    case 'ALL_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'GET_USER':
      return {
        ...state,
        userData: action.payload,
      };
    case 'GET_TOKEN':
      return {
        ...state,
        getuser_token: action.payload,
      };
    case 'ALL_CATEGORIES':
      return {
        ...state,
        allCategories: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
