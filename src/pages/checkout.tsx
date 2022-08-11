import type { NextPage } from "next";
import Checkout from "@modules/checkout/Checkout";
import { ToastContainer } from "react-toastify";

const Home: NextPage = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        className="text-sm"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
      />
      <Checkout />
    </>
  );
};

export default Home;