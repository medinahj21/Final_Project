import {
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  GET_FILTER_TAGS,
  ADD_FILTER_TAGS,
  MODIFY_PRODUCTS,
  CLEAN_PRODUCT_DETAIL,
  RETURN_PAGE,
  APPLY_FILTERS,
} from "../actions/actions";

const initialState = {
  allProducts: [],
  products: [],
  filterTags: [],
  productDetail: {},
  error: "",
  prevPage: 1,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      let filterAdminProduct = action.payload.allProducts;
      if (!action.payload.isAdmin) {
        filterAdminProduct = filterAdminProduct.filter(
          (product) => product.state
        );
      }

      return {
        ...state,
        allProducts: filterAdminProduct,
        products: filterAdminProduct,
      };

    case APPLY_FILTERS:
      let filters = action.payload;
      let filteredData = state.allProducts;

      filteredData = filteredData.filter((data) =>
        data.name.toLowerCase().includes(filters.name?.toLowerCase())
      );

      filters.tags?.forEach((tag) => {
        filteredData = filteredData.filter((product) => {
          let res = product.filterTags?.find((t) => {
            return t.name === tag;
          });
          return res;
        });
      });

      if (filters.isAscend === "false") {
        filteredData.sort((a, b) => a.price - b.price);
      }
      if (filters.isAscend === "true") {
        filteredData.sort((a, b) => b.price - a.price);
      }

      return { ...state, products: filteredData, prevPage: 1 };

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
        products: [...state.products, action.payload],
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
      };

    case GET_FILTER_TAGS:
      const filterTag = action.payload.map((filter) => {
        return { name: filter.name, id: filter.id };
      });
      return {
        ...state,
        filterTags: filterTag,
        prevPage: 1,
      };

    case ADD_FILTER_TAGS:
      return {
        ...state,
        filterTags: [...state.filterTags, action.payload],
      };

    case MODIFY_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case CLEAN_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: {},
      };

    case RETURN_PAGE:
      return {
        ...state,
        prevPage: action.payload,
      };

    default:
      return state;
  }
}
