import axios from "axios"
import { API_URLS } from "./API_URLS"
import {useParams} from "react-router-dom"
import useStore from "../components/store"

const Deletes = async (selectedarray,param) => {
    const { setStringValue, togglefunction}=useStore()

    const res2 = await axios({
      method: API_URLS.movetobin.method,
      url: `https://backend-gmail-finalss.vercel.app/${API_URLS.movetobin.endpoint}/${param}`,
      data: selectedarray
    });
    setStringValue(res2.data)
    togglefunction("ErrorbarStatus")
    console.log("Delete api called", selectedarray)
  }

export default Deletes;