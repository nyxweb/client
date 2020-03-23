import axios from 'axios';

// Types
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { notice } from 'actions/utils';

const postNews: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = news => async () => {
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_API_URI + `/admin/news`,
      news
    );

    notice(data);
  } catch (error) {
    notice(error);
  }
};

export default postNews;
