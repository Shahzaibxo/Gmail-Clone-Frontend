import { API_URLS } from "./API_URLS";
import axios from "axios";

const fetchDataAPI = async (param, User) => {
  
  try {
    const res = await axios({
      method: API_URLS.getEmailfromparam.method,
      url: `https://backend-gmail-finalss.vercel.app/${API_URLS.getEmailfromparam.endpoint}/${param}`,
      params: {
        email: User.email
      },
      headers: {
        Authorization: `Bearer ${User.token}`
      }
    });
    return res.data;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

export default fetchDataAPI
