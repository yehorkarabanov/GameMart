import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiLoginInstance} from "../../utils/axios";
import {debounce} from "lodash";

export const addSingleItemToCart = createAsyncThunk('cart/addSingleItemToCart', async (
    {pk, name, image, price, slug}, {dispatch, getState}) => {
    const state = getState();
    const isnew = !(state.cart.items.find(obj => obj.pk === pk));
    dispatch(addItemToCart({pk, name, image, price, slug}));
    const instance = await apiLoginInstance();
    if (instance != null && isnew) {
        try {
            await instance.post("cart/cart/", {"game": pk});
        } catch (e) {
            console.log("error with cart api");
        }
    }
});

export const removeSingleItemFromCart = createAsyncThunk('cart/removeSingleItemFromCart', async (
    pk, {dispatch}) => {
    dispatch(removeItemFromCart({pk}));
    const instance = await apiLoginInstance();
    if (instance != null) {
        try {
            await instance.delete(`cart/cart/${pk}/`);
        } catch (e) {
            console.log("error with cart api");
        }
    }
});

export const changeSingleItemInCart = createAsyncThunk('cart/changeSingleItemInCart', async (
    pk, {dispatch, getState}) => {
    const state = getState();
    const instance = await apiLoginInstance();

    const findItem = state.cart.items.find(obj => obj.pk === pk);
    if (!findItem) {
        dispatch(removeSingleItemFromCart(pk));
        return;
    }
    const amount = findItem.amount;
    if (amount === "") return;

    if (instance != null) {
        try {
            await instance.patch(`cart/cart/${pk}/`, {amount: amount});
        } catch (e) {
            console.log("error with cart api");
        }
    }
});

export const clearUserCart = createAsyncThunk('cart/clearUserCart', async (_, {dispatch})=>{
    dispatch(clearCart());
    const instance = await apiLoginInstance();
    if (instance != null) {
        try {
            await instance.delete(`cart/cart/destroy_all_for_user/`);
        } catch (e) {
            console.log("error with cart api");
        }
    }
});

export const syncCartWithBackend = createAsyncThunk('cart/syncCartWithBackend', async  (_, {dispatch, getState})=>{
    const instance = await apiLoginInstance();
    if (instance != null) {
        const state = getState();
        try {
            const res = await instance.get("cart/cart/");
            await dispatch(addManyCartItems(res.data));
        } catch (e) {
            console.log("error with getting cart");
        }
        const oldCart = state.cart.items.filter(obj => obj.isNew !== true);
        if (oldCart.length !== 0) {
            try {
                const res = await instance.post("cart/cart/", oldCart.map(game => ({game:game.pk})));
            } catch (e) {
                console.log("error with sending cart");
            }
        }
    }
});

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            if (!state.items.find(obj => obj.pk === action.payload.pk)) {
                state.items.push({...action.payload, amount: 1});
            }
        },
        removeItemFromCart(state, action) {
            state.items = state.items.filter(obj => obj.pk !== action.payload.pk);
        },
        changeCartItemAmount(state, action) {
            const findItem = state.items.find(obj => obj.pk === action.payload.pk);
            if (findItem) {
                findItem.amount = action.payload.amount;
                if (findItem.amount <= 0 && action.payload.amount !== "") {
                    state.items = state.items.filter(obj => obj.pk !== action.payload.pk);
                }
            }
        },
        clearCart(state, action) {
            state.items = [];
        },
        addManyCartItems(state, action) {
            const newData = action.payload.map(obj => {
                const gameObj = obj.game;
                const amount = obj.amount;
                return { ...gameObj, amount, isNew: true };
            });
            state.items = state.items.concat(newData);
        }
    },
});

export const {addItemToCart, removeItemFromCart, clearCart, addManyCartItems, changeCartItemAmount} = cartSlice.actions;
export default cartSlice.reducer;
