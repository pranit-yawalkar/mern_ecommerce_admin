import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getProductCategories = createAsyncThunk(
  "category/getAll",
  async (thunkAPI) => {
    try {
      return await productCategoryService.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  "product-category/create",
  async (data, thunkAPI) => {
    try {
      return await productCategoryService.createProductCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProductCategory = createAsyncThunk(
  "category/delete",
  async (id, thunkAPI) => {
    try {
      return await productCategoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await productCategoryService.updateCategory(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductCategory = createAsyncThunk(
  "category/get",
  async (id, thunkAPI) => {
    try {
      return await productCategoryService.getCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCategory = action.payload;
        if (state.isSuccess) {
          toast.success("Product Added Successfully!");
        }
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(deleteProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedCategory = action.payload;
        if (state.isSuccess) {
          toast.success("Product category deleted Successfully!");
        }
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(updateProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedCategory = action.payload;
        if (state.isSuccess) {
          toast.success("Product category updated Successfully!");
        }
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(getProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.category = action.payload;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      });
  },
});

export default productCategorySlice.reducer;
