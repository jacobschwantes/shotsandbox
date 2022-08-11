import PaddleLoader from "./components/PaddleLoader";

export default function Page() {
  return (
    <div>
      <PaddleLoader />
      <button
      className="text-white"
        onClick={() => {
          window.Paddle.Checkout.open({
            product: 33292,
            closeCallback: "checkoutClosed"
          });
        }}
      >
        Buy
      </button>
    </div>
  );
}
