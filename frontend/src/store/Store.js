import { configureStore } from "@reduxjs/toolkit";

import ContactSlice from "./Features/ContactSlice";

import QuotationSlice from "./Features/QuotationSlice";

const store = configureStore({
    
  reducer: {

    contact: ContactSlice.reducer,

    quotation: QuotationSlice.reducer,

  },

});

export default store;
