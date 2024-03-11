import { subPropertySaleScheme } from "@/app/utils/schema/propertySchema";
const initialState = {
  saleData: subPropertySaleScheme,
  userTokenData:null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SALE_DATA":
      return { ...state, saleData: action.payload };
    case "SET_USER_TOKEN":
      return {...state, userTokenData: action.payload};  
    default:
      return state;
  }
};

export default rootReducer;
