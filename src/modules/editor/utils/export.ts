import { toPng, toJpeg, toBlob } from "html-to-image";
import { toast } from "react-toastify";
interface ExportOptions {
  width: number;
  height: number;
}
export const downloadPng = (
  elementRef: HTMLElement,
  options: ExportOptions
) => {
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
export const downloadJpg = (
  elementRef: HTMLElement,
  options: ExportOptions
) => {
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
export const copyImageToClipboard = (
  elementRef: HTMLElement,
  options: ExportOptions
) => {
  toBlob(elementRef, {
    canvasWidth: options.width,
    canvasHeight: options.height,
    pixelRatio: 1,
    style: {
      borderRadius: "0px",
    },
  })
    .then((dataUrl) => {
      if (dataUrl) {
        navigator.clipboard.write([
          new ClipboardItem({
            "image/png": dataUrl,
          }),
        ]);
      }
      toast("copied to clipboard", { type: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getPngDataUrl = async (
  elementRef: HTMLElement,
  options: ExportOptions
) => {
 return await toPng(elementRef, {
    canvasWidth: options.width,
    canvasHeight: options.height,
    pixelRatio: 1,
    style: {
      borderRadius: "0px",
    },
  })
    .then((dataUrl) => {
      if (dataUrl) {
        console.log(dataUrl)
        return dataUrl
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getBlob = async (
  elementRef: HTMLElement,
  options: ExportOptions
) => {
 return await toBlob(elementRef, {
    canvasWidth: options.width,
    canvasHeight: options.height,
    pixelRatio: 1,
    style: {
      borderRadius: "0px",
    },
  })
    .then((dataUrl) => {
      if (dataUrl) {
        console.log(dataUrl)
        return dataUrl
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
