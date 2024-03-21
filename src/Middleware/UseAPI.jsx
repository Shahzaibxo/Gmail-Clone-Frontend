import { useState } from 'react';
import axios from "axios";

const useAPI=(APItype)=> {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true)
    const call = async (payload, type="") => {
        setResponse(null);

        try {
            const res = await axios({
                method: APItype.method,
                url: `http://localhost:8000/${APItype.endpoint}/${type}`,
                data: payload
              });
              setResponse(res.data);
        } 
        catch (error) {
            setError(error.message);
            setLoading(false)
        } 
        finally{
            setLoading(false)
        }
    }
    return { call, response, error, loading }
};

export default useAPI