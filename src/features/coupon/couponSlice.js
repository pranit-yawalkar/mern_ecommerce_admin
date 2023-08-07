import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";
import { toast } from "react-toastify";

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCoupons = createAsyncThunk(
  "coupon/getAll",
  async (thunkAPI) => {
    try {
      return await couponService.getCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupon/create",
  async (data, thunkAPI) => {
    try {
      return await couponService.createCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCoupon = action.payload;
        if (state.isSuccess) {
          toast.success("Coupon Added Successfully!");
        }
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError) {
          toast.error("Something went wrong!");
        }
      });
  },
});

export default couponSlice.reducer;
