import axios from 'axios';

const fetchEvents = async () => {
  try {
    const { data } = await axios.get('http://localhost:2000/config/events');
    return data;
  } catch (error) {
    return false;
  }
};

export default fetchEvents;
