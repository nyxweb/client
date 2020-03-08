import { store } from "react-notifications-component";

interface Props {
  error?: string;
  success?: string;
  response?: {
    data: {
      error: string;
      success: string;
    };
  };
}

const notice = ({ error, success, response }: Props) => {
  const type =
    success || response?.data.success
      ? "success"
      : error || response?.data.error
      ? "danger"
      : "warning";

  const message = error || success || response?.data.error;

  if (!message) return;

  store.addNotification({
    type,
    message,
    insert: "bottom",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
      pauseOnHover: true
    }
  });
};

export default notice;
