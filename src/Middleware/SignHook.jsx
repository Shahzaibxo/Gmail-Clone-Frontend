import React, { useState } from 'react'
import useStore from '../components/store'
import { useNavigate } from 'react-router-dom'

export default function SignHook() {
    const appnav = useNavigate()
    const { setStringValue, togglefunction } = useStore()
    const [isLoading, setisLoading] = useState(false)
    const signup = async (email, name, password) => {
        setisLoading(true)
        try {
            const response = await fetch('http://localhost:8000/registration/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, password }),
            });
            if (response.ok) {
                const data = await response.json();
                useStore.setState({ User: data })
                localStorage.setItem('USERDATA', JSON.stringify(data))
                appnav("/emails/inbox")


            } else {
                const errorMessage = await response.json();
                setStringValue(errorMessage.error)
                togglefunction("ErrorbarStatus")


            }
        }
        finally {

            setisLoading(false)
        }
    }
    return { isLoading, signup }

}
