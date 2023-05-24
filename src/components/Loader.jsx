import React from "react";
import { useSelector } from "react-redux";
import { FadeLoader, PacmanLoader } from "react-spinners";

const Loader = ({ show }) => {
  // const isLoading = useSelector(
  //   (state) =>
  //     state?.auth?.isLoading ||
  //     state?.customer?.isLoading ||
  //     state?.product?.isLoading ||
  //     state?.brand?.isLoading ||
  //     state?.productCategory?.isLoading
  // );

  // if (!isLoading) {
  //   return;
  // }

  return (
    show && (
      <div className="loader">
        <FadeLoader
          color="#0e7be9"
          loading={true}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h3>Loading...</h3>
      </div>
    )
  );
};

export default Loader;
