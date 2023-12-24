import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiLoginInstance} from "../../utils/axios";


export const toggleLike = createAsyncThunk('like/toggleLike', async ({pk, name, image, price, slug, isitem}, {
    dispatch
}) => {
    dispatch(toggleLikeItem({pk, name, image, price, slug}));
    const instance = await apiLoginInstance();
    if (instance != null) {
        try {
            if (!isitem) {
                await instance.post("like/like/", {"game": pk});
            } else {
                await instance.delete(`like/like/${pk}/`);
            }
        } catch (e) {
            console.log("error with like api");
        }
    }
});

export const syncLikeWithBackend = createAsyncThunk('like/syncLikeWithBackend', async (_, {dispatch, getState}) => {
    const instance = await apiLoginInstance();
    if (instance != null) {
        try {
            const res = await instance.get("like/like/");
            await dispatch(addManyLikeItems(res.data));
        } catch (e) {
            console.log("error with getting like");
        }
        const state = getState();
        const oldLike = state.like.items.filter(obj => obj.isNew !== true);
        if (oldLike.length !== 0) {
            try {
                const res = await instance.post("like/like/", oldLike.map(game => ({game: game.pk})));
            } catch (e) {
                console.log("error with sending like");
            }
        }
    }
});

const initialState = {
    items: [],
};

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        toggleLikeItem(state, action) {
            if (state.items.find(obj => obj.pk === action.payload.pk)) {
                state.items = state.items.filter(obj => obj.pk !== action.payload.pk);
            } else {
                state.items.push({...action.payload});
            }
        },
        clearLike(state, action) {
            state.items = [];
        },
        addManyLikeItems(state, action) {
            const newData = action.payload.map(obj => obj.game).map(obj => ({...obj, isNew: true}));
            state.items = state.items.concat(newData);
        }
    },
});

export const {toggleLikeItem, clearLike, addManyLikeItems} = likeSlice.actions;
export default likeSlice.reducer;

