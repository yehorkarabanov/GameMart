import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const checkTokens = createAsyncThunk('user/checkTokens', async (params, {dispatch, getState}) => {
    const state = getState();
    if (JSON.parse(atob(state.user.refresh.split('.')[1])).exp < Math.floor(Date.now() / 1000)) {
        dispatch(logOut());
    }
});


const initialState = {
    refresh: null,
    access: null,
    userdata: {
        username: "",
        email: "",
    },
    isLogin: false,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokens(state, action) {
            state.refresh = action.payload.refresh;
            state.access = action.payload.access;
            const data = JSON.parse(atob(action.payload.refresh.split('.')[1]));
            state.userdata.username = data.username;
            state.userdata.email = data.email;
            state.isLogin = true;
        },
        logOut(state, action) {
            state.refresh = null;
            state.access = null;
            state.userdata = {
                username: "",
                email: "",
            };
            state.isLogin = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkTokens.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkTokens.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(checkTokens.rejected, (state) => {
                state.loading = false;
            })

    },
});

export const {setTokens, logOut} = userSlice.actions;
export default userSlice.reducer;
