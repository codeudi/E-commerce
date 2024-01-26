import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginReducer } from '../RTK_Setup/authSlice';
import {useDispatch,useSelector} from "react-redux"

const Sign_in = () => {

    const { account, setAccount } = useContext(Logincontext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    // console.log(data);

    let navigate=useNavigate()

    const dispatch=useDispatch()
    const senddata = async (e) => {
        e.preventDefault();

        // console.log(email);
        try {
            const res = await fetch("http://localhost:10000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const data = await res.json();

            console.log(`login response ${data}`)
            
            if(data)
                dispatch(loginReducer(data))
            

            localStorage.setItem("token",data.tokens)
            console.log(data);

            if (res.status === 400 || !data) {
                console.log("invalid details");
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setAccount(data);
                setEmail("")
                setPassword("")
                toast.success("Login Successfully done 😃!", {
                    position: "top-center"
                });
                navigate("/")
            }
        } catch (error) {
            console.log("login page ka error" + error.message);
        }
    };

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Sign-In</h1>

                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"
                                onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}
                                value={email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                                value={password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
                    </form>
                    <ToastContainer />
                </div>
                <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <button>  <NavLink to="/signup">Create your Amazon Account</NavLink></button>
                </div>
            </div>

        </section>
    )
}

export default Sign_in