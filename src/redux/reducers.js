import { subPropertySaleScheme } from "@/app/utils/schema/propertySchema";
const initialState = {
  saleData: subPropertySaleScheme,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SALE_DATA":
      return { ...state, saleData: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
