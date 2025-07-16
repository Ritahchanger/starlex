import { createSlice } from "@reduxjs/toolkit"


const QuotationSlice = createSlice({

    name:"quotation",

    initialState:{

        isOpen:false,

    },


    reducers:{

        openQuotationSlice:(state)=>{

            state.isOpen = true;

        },

        closeQuotationSlice:(state)=>{

            state.isOpen = false;

        }

    }

})


export  const  { openQuotationSlice, closeQuotationSlice } =  QuotationSlice.actions;


export default QuotationSlice;