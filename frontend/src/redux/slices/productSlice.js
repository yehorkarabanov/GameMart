import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiInstance from "../../utils/axios";

export const getProducts = createAsyncThunk('product/getProducts', async (params, {dispatch, getState}) => {
    const state = getState();
    if (Date.now() / 1000 > state.product.expireAt) {
        const response = await apiInstance.get('products/product/', {params: {limit: 8}});
        dispatch(setProductExpire(Date.now() / 1000 + 3600));
        return response.data;
    } else {
        return state.product.items;
    }
});

const initialState = {
    status: '',//loading, success, failed
    items: [],
    current: [],
    expireAt: 0,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductExpire(state, action) {
            state.expireAt = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(getProducts.rejected, (state) => {
                state.status = "failed";
            })
    },
});

export const {setProductExpire} = productSlice.actions;
export default productSlice.reducer;