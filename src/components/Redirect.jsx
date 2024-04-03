import React from 'react'
import { Link } from 'react-router-dom'
import useStore from './store'
import img from "../assets/nouser.png"

export default function Redirect() {
  const { User } = useStore()
  console.log("User", User)
  return (
    <>
      <img src={img} style={{ height: "200px", margin: "0 auto" }} alt="" />
      <div style={{ margin: "0 auto", width: "fit-content", display: "block" }}>
        No user found, dplease redirect to <span style={{ color: "blue", fontWeight: 600 }}><Link to="/registration/signup">Sign up</Link></span>
      </div>
    </>
  )
}
