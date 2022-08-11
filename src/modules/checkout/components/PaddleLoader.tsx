import Script from "next/script";
export default function PaddleLoader() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/paddle.js"
      onLoad={() => {
        
          window.Paddle.Environment.set("sandbox");

        window.Paddle.Setup({
          vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
        });
      }}
    />
  );
}