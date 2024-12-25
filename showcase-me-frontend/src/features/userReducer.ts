import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState {
    user:{email : string, password : string} | null;
    token: string | null;
}

const initialState : UserState ={
    user:null,
    token:null
}

const userSlice = createSlice({
    name:'user',    
    initialState,
    reducers:{
        setUser(state,action: PayloadAction<{user: UserState['user'], token: UserState['token']}>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
    },
    logout(state){
        state.user = null;
        state.token = null;
    }
    }
})

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;