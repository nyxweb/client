import axios from 'axios';

const getCharacters = async () => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + '/characters'
    );
    return typeof data === 'object' ? data : false;
  } catch (error) {
    return false;
  }
};

export default getCharacters;
