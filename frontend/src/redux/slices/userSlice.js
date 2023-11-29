import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {clearLike, clearLikeSlice} from "./likeSlice";
import {useDispatch} from "react-redux";
import apiInstance from "../../utils/axios";

export const checkRToken = createAsyncThunk('user/checkRToken', async (params, {dispatch, getState}) => {
    const state = getState();
    if (JSON.parse(atob(state.user.refresh.split('.')[1])).exp < Math.floor(Date.now() / 1000)) {
        dispatch(logOut());
    }
});

export const checkAToken = createAsyncThunk('user/checkAToken', async (params, {dispatch, getState}) => {
    await dispatch(checkRToken());
    const state = getState();
    if (JSON.parse(atob(state.user.access.split('.')[1])).exp < Math.floor(Date.now() / 1000)) {
        const res = await apiInstance.post("account/login/refresh", {
            refresh: state.user.refresh,
        });
        dispatch(setTokens(res.data));
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
    }, extraReducers: (builder) => {
        builder
            .addCase(checkRToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkRToken.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(checkRToken.rejected, (state) => {
                state.loading = false;
            })
    },

});

export const {setTokens, logOut} = userSlice.actions;
export default userSlice.reducer;
