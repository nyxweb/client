import axios from 'axios';

const fetchEvents = async () => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + '/config/events'
    );
    return typeof data === 'object' ? data : false;
  } catch (error) {
    return false;
  }
};

export default fetchEvents;