import { createSlice } from "@reduxjs/toolkit"


const ContactSlice = createSlice({

    name:"contact",

    initialState:{

        isOpen:false,

    },


    reducers:{

        openContactModal:(state)=>{

            state.isOpen = true;

        },

        closeContactModal:(state)=>{

            state.isOpen = false;

        }

    }

})


export  const  { openContactModal, closeContactModal } =  ContactSlice.actions;


export default ContactSlice;