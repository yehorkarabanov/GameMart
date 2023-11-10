import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiInstance from "../../utils/axios";

export const getProducts = createAsyncThunk('product/getProducts', async (params, {dispatch, getState}) => {
    const response = await apiInstance.get('products/product/', {params: {limit: 8}});
    return response.data;
});

const initialState = {
    status: '',//loading, success, failed
    items: [],
    curent: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
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

export const {} = productSlice.actions;
export default productSlice.reducer;