import React, { useContext, useEffect, useState } from 'react'
import "./navbaar.css"
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider';
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
//import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader';
import { getProducts } from '../RTK_Setup/productSlice';
import { useSelector, useDispatch } from "react-redux";
import { logoutReducer } from '../RTK_Setup/authSlice';


const usestyle = makeStyles({
    component: {
        marginTop: 10,
        marginRight: "-50px",
        width: "300px",
        padding: 50,
        height: "300px"
    },
})


const Navbaar = () => {

    const classes = usestyle();

    //const history = useHistory("");

    const [text, setText] = useState();
    const [products,setProducts]=useState([])

    const loginState=useSelector(state=>state.auth.authStatus)
    console.log("login state ",loginState)

    // only for search

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


    const [open, setOpen] = useState(false);
    const [liopen, setLiopen] = useState(true);

    const [dropen, setDropen] = useState(false);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };
    const handleClose = () => {
        setOpen(false)
    };

    const { account, setAccount } = useContext(Logincontext);

    const getdetailsvaliduser = async () => {
        const res = await fetch("https://backendecommerce.azurewebsites.net/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data);

        if (res.status !== 201) {
            console.log("first login");
        } else {
            // console.log("cart add ho gya hain");
            setAccount(data);
        }
    }

   /* useEffect(() => {
        getdetailsvaliduser();
    }, []);*/


    // for logout
    const logoutuser = async () => {
        dispatch(logoutReducer())
        localStorage.removeItem("token")
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
            //history.push("/");
        }

    // for drawer

    const handelopen = () => {
        setDropen(true);
    }

    const handleClosedr = () => {
        setDropen(false)
    }

    const getText = (text) => {
        setText(text)
        setLiopen(false)
    }


    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className="hamburgur" onClick={handelopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                        {/* here define the right header */}
                    <Drawer open={dropen} onClose={handleClosedr} >
                        <Rightheader userlog={logoutuser} logclose={handleClosedr} />
                    </Drawer>
                    <div className="navlogo">
                        <NavLink to="/"> <img src="./amazon_PNG25.png" alt="logo" /> </NavLink>
                    </div>
                    <div className="nav_searchbaar">
                        <input type="text" name=""
                            onChange={(e) => getText(e.target.value)}
                            placeholder="Search Your Products" />
                        <div className="search_icon">
                            <i className="fas fa-search" id="search"></i>
                        </div>
                        {
                            text &&
                            <List className="extrasearch" hidden={liopen}>
                                { products.length > 0 && 
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className="right">
                    { loginState ?  ( <button className='logout_btn' style={{fontSize:"13px"}} onClick={
                        logoutuser
                    }>Logout</button> ) :(
                    <div className="nav_btn">
                        <NavLink to="/login" style={{fontSize:"13px"}}>Sign in</NavLink>
                    </div>)}
                    {
                        account ? <NavLink to="/buynow">
                            <div className="cart_btn" style={{display:"flex",}}>
                                

                                <p style={{fontSize:"13px"}}>Cart</p>
                            </div>
                        </NavLink> : <NavLink to="/login">
                            <div className="cart_btn">
                                
                                <p style={{fontSize:"13px"}}>Cart</p>
                            </div>
                        </NavLink>
                    }

                    {
                        account ?
                            <Avatar className="avtar2"
                                onClick={handleClick} title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar"
                                onClick={handleClick} />
                    }

                    <div className="menu_div">
                        <Menu
                            anchorEl={open}
                            open={Boolean(open)}
                            onClose={handleClose}
                            className={classes.component}
                        >
                            <MenuItem onClick={handleClose} style={{ margin: 10 }}>My account</MenuItem>
                            {account ? <MenuItem style={{ margin: 10 }} onClick={logoutuser}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />   Logout</MenuItem> : ""}
                        </Menu>
                    </div>
                    <ToastContainer />
                </div>
            </nav>
        </header>
    )
}

export default Navbaar;