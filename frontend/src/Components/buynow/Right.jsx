import React, { useEffect, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
//import { useHistory } from 'react-router';
import axios from "axios"
import useRazorpay from "react-razorpay"

const Right = ({ iteam }) => {

    // console.log(iteam);
    const [val, setVal] = useState(false);

    const [price, setPrice] = useState(0);

    const [Razorpay]=useRazorpay()
    //const history = useHistory("");

    useEffect(() => {
        totalAmount();
    }, [iteam]);

    const totalAmount = () => {
        let price = 0
        iteam.map((item) => {
            price += Number(item.price.cost)
        });
        setPrice(price)
    }

    const proceesby = async ()=>{

        console.log(`the total amount we got is ${price}` )
        const response=await axios.post("http://localhost:10000/order", {
            price
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        console.log("response from backend ",response)

        const order=response.data.order

        const options = {
            key: 'rzp_test_cMxpD3beMcALIb', 
            amount: "50000", 
            currency: "INR",
            order_id: order.id, 
            handler:function (response){
                alert(response.razorpay_payment_id)
                alert(response.razorpay_order_id)
                alert(response.razorpay_signature)
            }
        };

        const rzp1=new Razorpay(options)
        rzp1.open();
    }

    return (
        <div className="right_buy">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
            <div className="cost_right">
                <p>Your order is eligible for FREE Delivery. <br />
                    <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                <h3>Subtotal ({iteam.length} items): <span style={{ fontWeight: "700" }}> ₹{price}.00</span></h3>
                <button className="rightbuy_btn"  onClick={proceesby} >Proceed to Buy</button>
                <div className="emi" onClick={() => setVal(!val)}>
                    Emi available
                    {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
                <span className={val ? "show" : "hide"}> Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
                    Jewelry, Gift cards and Amazon pay balance top up). Learn more</span>
            </div>
        </div>
    )
}

export default Right;