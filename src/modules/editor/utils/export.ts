import { toPng, toJpeg, toBlob } from "html-to-image";
import { toast } from "react-toastify";
export const downloadPng = (elementRef, options) => {
  toPng(elementRef, {
    canvasWidth: options.width,
    canvasHeight: options.height,
    pixelRatio: 1,
    style: {
      borderRadius: "0px",
    },
  })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const downloadJpg = (elementRef, options) => {
  toJpeg(elementRef, {
    canvasWidth: options.width,
    canvasHeight: options.height,
    style: {
      borderRadius: "0px",
    },
    pixelRatio: 1,
  })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "my-image-name.jpg";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const copyImageToClipboard = (elementRef, options) => {
  toBlob(elementRef, {
    canvasWidth: options.width,
    canvasHeight: options.height,
    pixelRatio: 1,
    style: {
      borderRadius: "0px",
    },
  })
    .then((dataUrl) => {
      navigator.clipboard.write([
        new ClipboardItem({
          "image/png": dataUrl,
        }),
      ]);
      toast("copied to clipboard", { type: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};
