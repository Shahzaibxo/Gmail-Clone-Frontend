import React, { useState } from 'react'
import useStore from '../components/store'
import { useNavigate } from 'react-router-dom'

export default function LoginHook() {
    const { setStringValue, togglefunction } = useStore()
    const [isLoading, setisLoading] = useState(false)
    const appnav = useNavigate()

    const login = async (email, password) => {
       
        try {
            setisLoading(true)
            const response = await fetch('http://localhost:8000/registration/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                useStore.setState({ User: data })
                localStorage.setItem('USERDATA', JSON.stringify(data));
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

    return { isLoading, login }

}
