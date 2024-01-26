import React from 'react'
import "./newnav.css";
import {Link} from "react-router-dom"

const Newnav = () => {
    return (
        <div className="new_nav">
            <div className="nav_data">
                <div className="left_data">
                    <p><i className="fas fa-shopping-cart"></i> All</p>
                    <Link to="/getMobileData" style={{color:"white",textDecoration:"none",fontSize:"13px"}}>Mobiles</Link>
                    <Link to="/getBestSellerData" style={{color:"white",textDecoration:"none",fontSize:"13px"}}>Best Sellers</Link>
                    <Link to="/getFashionData" style={{color:"white",textDecoration:"none",fontSize:"13px"}}>Fashion</Link>
                    <p>Customer Service</p>
                    <Link to="/getElectronicsData" style={{color:"white",textDecoration:"none",fontSize:"13px"}}>Electronics</Link>
                    <p>Prime</p>
                    <Link to="/getTodaysDealData" style={{color:"white",textDecoration:"none",fontSize:"13px"}}>Today's Deals</Link>
                    <p>Amazon Pay</p>
                </div>
                <div className="right_data">
                    <img src="nav.jpg" alt="navdata" />
                </div>
            </div>
        </div>
    )
}

export default Newnav
