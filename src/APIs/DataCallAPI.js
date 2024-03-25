import { API_URLS } from "./API_URLS";
import axios from "axios";

const fetchDataAPI= async(param)=>{
  try {
    const res = await axios({
      method: API_URLS.getEmailfromparam.method,
      url: `https://bbackend-clone.vercel.app/${API_URLS.getEmailfromparam.endpoint}/${param}`,
    });
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

export default fetchDataAPI
