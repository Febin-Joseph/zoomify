import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        closeChat: false,
    },
    reducers: {
        setCloseChat: (state, action) => {
            state.closeChat = action.payload;
        },
    },
})

export const { setCloseChat } = chatSlice.actions;
export default chatSlice.reducer;