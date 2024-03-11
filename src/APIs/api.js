import axios from "axios";

const Gmail_API= async (urlobj, payload)=>{
    return await axios({
        method: urlobj.method,
        url: `http://localhost:8000/${urlobj.endpoint}`,
        data: payload
      });

}

export default Gmail_API;