import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        toggleItem(state, action) {
            if (state.items.find(obj => obj.pk === action.payload.pk)) {
                state.items = state.items.filter(obj => obj.pk !== action.payload.pk);
            } else {
                state.items.push({...action.payload});
            }
        },
        clearLike(state, action) {
            state.items = [];
        },
        addManyItems(state, action) {
            const newData = action.payload.map(obj => obj.game).map(obj => ({...obj, isNew: true}));
            state.items = state.items.concat(newData);
        }
    },
});

export const {toggleItem, clearLike, addManyItems} = likeSlice.actions;
export default likeSlice.reducer;

