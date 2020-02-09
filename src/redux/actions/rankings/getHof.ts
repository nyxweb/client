import axios from 'axios';

// Types
import { GET_HOF, GET_HOF_FAILED } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getHof: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = () => async dispatch => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + '/characters/hof'
    );

    dispatch({
      type: !data.error ? GET_HOF : GET_HOF_FAILED,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_HOF_FAILED
    });
  }
};

export default getHof;
