import { store } from 'react-notifications-component';

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

const notice = (obj: Props) => {
  const type =
    obj.success || obj.response?.data.success
      ? 'success'
      : obj.error || obj.response?.data.error
      ? 'danger'
      : 'warning';

  const message = obj.error || obj.success || obj.response?.data.error;

  store.addNotification({
    type,
    message,
    insert: 'bottom',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
      pauseOnHover: true
    }
  });
};

export default notice;
