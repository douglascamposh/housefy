import { subPropertySaleScheme } from "@/app/utils/schema/propertySchema";
const initialState = {
    Data:subPropertySaleScheme,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DATA':
        return { ...state, Data: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  