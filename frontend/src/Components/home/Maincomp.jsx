import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import "./home.css";
import Slide from './Slide';
import { Divider } from '@mui/material';
import { getProducts } from '../RTK_Setup/productSlice';
import { useSelector, useDispatch } from "react-redux";


const Maincomp = () => {

    // const { products } = useSelector(state => state.getproductsdata);
    // console.log(products);
    const [products,setProducts]=useState([])
    const dispatch = useDispatch();

    async function getItems()
    {
        const data = await fetch("http://localhost:10000/getproducts",{
                        method:"GET",
                        headers:{
                            "Content-Type":"application/json"
                        }
                });
        console.log(data)
        const res = await data.json();
        setProducts(res)
    }

    useEffect(()=>{
        getItems()
    },[])

    useEffect(()=>{
        if(!(products.length == 0))
            dispatch(getProducts(products))
    },[products])

    if(!(products.length == 0))
    return (
        <>
            
            <div className="home_section">
                <div className="banner_part">
                    <Banner />
                </div>
                <div className="slide_part">
                    <div className="left_slide">
                        <Slide title="Deal Of The Day" products={products} />
                    </div>
                    <div className="right_slide">
                        <h4>Festive latest launches</h4>
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="rightimg" />
                        <a href="#">see more</a>
                    </div>
                </div>

                <Slide title="Today's Deal" products={products} />

                <div className="center_img">
                    <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
                </div>

                <Slide title="Best Seller" products={products} />
                <Slide title="Upto 80% off" products={products} />
            </div>

            <Divider />

        </>
    )
}

export default Maincomp;