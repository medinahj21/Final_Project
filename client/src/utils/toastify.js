import { toast } from "react-toastify";

export const notifyError = (error) =>
  toast.error(error, {
    hideProgressBar: true,
    theme: "colored",
    position: toast.POSITION.BOTTOM_RIGHT,
  });

export const notifyLoad = (message) =>
  toast.loading(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
  });

export const notify = (message) =>
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });

export const notifyInfo = (message) =>
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    hideProgressBar: true,
  });

export const dismissAll = () => toast.dismiss();
