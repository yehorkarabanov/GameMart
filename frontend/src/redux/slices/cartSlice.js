import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCartItem(state, action) {
            if (state.items.find(obj => obj.pk === action.payload.pk)) {
                state.items = state.items.filter(obj => obj.pk !== action.payload.pk);
            } else {
                state.items.push({...action.payload});
            }
        },
        clearCart(state, action) {
            state.items = [];
        },
        addManyCartItems(state, action) {
            const newData = action.payload.map(obj => obj.game).map(obj => ({...obj, isNew: true}));
            state.items = state.items.concat(newData);
        }
    },
});

export const {toggleCartItem, clearCart, addManyCartItems} = cartSlice.actions;
export default cartSlice.reducer;
