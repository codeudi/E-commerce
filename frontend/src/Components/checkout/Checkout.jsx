import React, { useContext, useEffect, useState } from 'react'
import "./Checkout.css";
import { products } from '../home/productdata';
import { Divider } from '@mui/material';
import { useParams,useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Logincontext } from "../context/Contextprovider";
import axios from "axios"
const Checkout = () => {

    // step-1 as soon as page loads get the required data

    const {id}=useParams()

    const [inddata,setIndData]=useState(null)


    async function getRespectiveIdData()
    {
        const response=await axios.get(`http://localhost:10000/getParticularMobileData/${id}`)

        console.log("checkout ka response ",response)

        setIndData(response.data.sendData)
    }

    useEffect(()=>{
        getRespectiveIdData()
    },[])

    async function addToCart()
    {
        let tokens=localStorage.getItem("token")
        console.log(tokens)
        let payload={
            tokens,
            id
        }
        console.log(payload)
        let response=await axios.post("http://localhost:10000/addToCart",payload,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
        }})

        console.log(response)
    }



    return (

        <div className="cart_section">
            {inddata && Object.keys(inddata).length &&
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={inddata.detailUrl} alt="cart" />
                        <div className="cart_btn">
                            <button className="cart_btn1" onClick={addToCart}>Add to Cart</button>
                            <button className="cart_btn2" >Buy Now</button>
                        </div>

                    </div>
                    <div className="right_cart">
                        <h3>{inddata.title.shortTitle}</h3>
                        <h4>{inddata.title.longTitle}</h4>
                        <Divider />
                        <p className="mrp">M.R.P. : <del>₹{inddata.price.mrp}</del></p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}> ₹{Number(Number(inddata.price.mrp) - Number(inddata.price.cost))} ({inddata.price.discount}) </span></p>

                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{inddata.discount}</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                        <p className="description">About the Item : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                    </div>
                </div>
            }



            {!inddata ? <div className="circle">
                <CircularProgress />
                <h2> Loading....</h2>
            </div> : ""}
        </div>
    )
}

export default Checkout