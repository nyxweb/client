import axios from 'axios';

import { notice } from 'actions/utils';

interface Props {
  username: string;
  password: string;
  repassword: string;
  email: string;
}

const register = async (form: Props) => {
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_API_URI + '/users',
      form
    );

    notice(data);
  } catch (error) {
    notice(error);
  }
};

export default register;
