export const selector = (state) =>
  state?.auth?.isLoading ||
  state?.customer?.isLoading ||
  state?.product?.isLoading ||
  state?.brand?.isLoading ||
  state?.productCategory?.isLoading;
