import React, { useState } from 'react'
import Gmail_API from '../APIs/api'

const useAPI=(urlobj)=> {
    const [response, setResponse] = useState(null);
    const [error, seterror] = useState("")
    const [loading, setLoading] = useState(false)
    const call = async (payload) => {
        setLoading(true)
        seterror("")
        setResponse(null)
        try {
            const res = await Gmail_API(urlobj, payload)
            setResponse(res.data)
        } catch (error) {
            seterror(error.message);
        } finally{
            setLoading(false);
        }
    }
    return {call, error, response, loading}
};

export default useAPI