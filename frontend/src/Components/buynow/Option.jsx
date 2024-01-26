import React, { useContext, useState } from 'react'
import { Logincontext } from '../context/Contextprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Option = ({ deletedata, price,get ,optionValue,setOptionValue}) => {
     console.log("Mai option k andar hu ",deletedata);
     const token=localStorage.getItem("token")

    const { account, setAccount } = useContext(Logincontext);
    // console.log(account);


    const [value1,setValue1]=useState(1)

    console.log("value1 ",value1)
    const removedata = async (id) => {
        try {
            console.log(token,id)
            const res = await axios.post(`http://localhost:10000/removeItem/${id}`,{
                tokenSend:token
            },{
            headers:{
                'Content-Type':'application/json'
            }})

            console.log("Remove data ka response ",res)
            // console.log(data);

            if (res.status === 400 ) {
                console.log("error aai remove time pr");
            } else {
                get();
                toast.success("Item remove from cart 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="add_remove_select" key={deletedata}>
            <p onClick={() => removedata(deletedata)} style={{ cursor: "pointer" }}>Delete</p><span>|</span>
            <p className="forremovemedia">Save Or Later</p><span>|</span>
            <p className="forremovemedia">See More like this</p>
            <ToastContainer />
        </div>

    )
}

export default Option;