import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastSettings = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const displayNotification = (message, isError) => {
  if (isError) {
    console.log("inside the display notification");
    toast.error(message, toastSettings);
  } else {
    console.log("inside the display notification");

    toast.success(message, toastSettings);
  }
};
