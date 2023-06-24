import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "./brandService";
import { toast } from "react-toastify";

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBrands = createAsyncThunk("brand/getAll", async (thunkAPI) => {
  try {
    return await brandService.getBrands();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createBrand = createAsyncThunk(
  "brand/create",
  async (data, thunkAPI) => {
    try {
      return await brandService.createBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBrand = action.payload;
        if (state.isSuccess) {
          toast.success("Product Added Successfully!");
        }
      })
      .addCase(createBrand.rejected, (state, action) => {
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

export default brandSlice.reducer;
