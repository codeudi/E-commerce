const express = require("express");
const router =  express.Router();
const products = require("../models/productsSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const authenicate = require("../middleware/authenticate");
const jwt=require("jsonwebtoken")
const Razorpay=require("razorpay")
// router.get("/",(req,res)=>{
//     res.send("this is testing routes");
// });
const Mobiles=require("../models/mobileSchema")

// get the products data

router.get("/getproducts", async (req, res) => {
    try {
        const producstdata = await products.find();
        res.status(201).json(producstdata);
    } catch (error) {
        console.log("error" +error.message);
    }
});


// register the data
router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "filll the all details" });
    };

    try {

        const preuser = await User.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new User({
                fname, email, mobile, password, cpassword
            });

            // yaha pe hashing krenge

            const storedata = await finaluser.save();
            // console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("error the bhai catch ma for registratoin time" + error.message);
        res.status(422).send(error);
    }

});



// login data
router.post("/login", async (req, res) => {
     console.log("login k andar aaye ",req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await User.findOne({ email: email });
        console.log(userlogin);
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);



            if (!isMatch) {
                res.status(400).json({ error: "invalid crediential pass" });
            } else {
                
                const token = await userlogin.generatAuthtoken();
                console.log(token);
                userlogin.tokens=token
                await userlogin.save()
                /*const options={
                    expiresIn:Date.now()+30*60*1000,
                    httpOnly:true
                }

                res.cookie("token",token,options);
                console.log(req.cookies)*/
                console.log("userlogin",userlogin)
                res.status(201).json(userlogin);
            }

        } else {
            res.status(400).json({ error: "user not exist" });
        }

    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        console.log("error the bhai catch ma for login time" + error.message);
    }
});

// getindividual

router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const individual = await products.findOne({ id: id });

        res.status(201).json(individual);
    } catch (error) {
        res.status(400).json(error);
    }
});


// adding the data into cart
router.post("/addcart/:id", async (req, res) => {

    try {
        const {tokens}=req.body.inddata
      
        const decode=await jwt.verify(tokens,process.env.KEY)
        
        req.userID=decode._id
       
        const { id } = req.params;
        const cart = await products.findOne({ id: id });
        

        const Usercontact = await User.findOne({ _id: req.userID });
        

        if (Usercontact) {
            const cartData = await Usercontact.addcartdata(cart);

            await Usercontact.save();
           
            res.status(201).json(Usercontact);
        }
    } catch (error) {
        console.log(error);
    }
});


// get data into the cart
router.post("/cartdetails", async (req, res) => {
    try {
        
        req.userID=await jwt.verify(req.body.indata,process.env.KEY)
        
        const buyuser = await User.findOne({ _id: req.userID });
        
        res.status(201).json(buyuser);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});



// get user is login or not
router.get("/validuser", authenicate, async (req, res) => {
    try {
        const validuserone = await User.findOne({ _id: req.userID });
        
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for valid user");
    }
});

// for userlogout

router.get("/logout", authenicate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("eccomerce", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});


router.post("/removeItem/:id", async (req, res) => {
    try {
        
        const { id } = req.params;
        const token = req.body.tokenSend
       
        const decode1=jwt.verify(token,process.env.KEY)
        
        let cartdata=await User.findOne({_id:decode1._id})
        // const newData=cartdata.carts((ele)=>ele.id!=id)
        const newData=cartdata.carts.filter((ele)=>ele.id !== id)

        cartdata.carts=newData
        await cartdata.save()

        res.status(201).json(newData);

    } catch (error) {
        console.log(error + "jwt provide then remove");
        res.status(400).json(error);
    }
});

router.post('/order',async (req,res)=>{

    const {price}=req.body

    const instance = new Razorpay({ 
        key_id: 'rzp_test_cMxpD3beMcALIb',
        key_secret: 'pLuT2CHJFg24xHMtdWcH92po' })

    const options={
        amount: price*100,
        currency: "INR",
        receipt: "receipt#1",
    }

    const myOrder=await instance.orders.create(options)

    res.status(200).json({
        success:true,
        price,
        order:myOrder
    })
})

router.get("/getMobileData",async (req,res)=>{

    const data=await Mobiles.find({category:"mobile"})

    res.status(200).json({
        success:true,
        sendResponse:data
    })
})

router.get("/getElectronicData",async (req,res)=>{

    const data=await Mobiles.find({category:"electronics"})

    res.status(200).json({
        success:true,
        sendResponse:data
    })
})

router.get("/getFashionData",async (req,res)=>{

    const data=await Mobiles.find({category:"fashion"})

    res.status(200).json({
        success:true,
        sendResponse:data
    })
})

router.get("/getBestSellerData",async (req,res)=>{

    const data=await Mobiles.find({category:"bestsellers"})

    res.status(200).json({
        success:true,
        sendResponse:data
    })
})

router.get("/getTodaysDealData",async (req,res)=>{

    const data=await Mobiles.find({category:"deal"})

    res.status(200).json({
        success:true,
        sendResponse:data
    })
})

router.get("/getParticularMobileData/:id",async (req,res)=>{
    const {id}=req.params

    const mobileData=await Mobiles.findOne({id:id})

    res.status(200).json({
        success:true,
        sendData:mobileData
    })
})

router.post("/addToCart",async (req,res)=>{
    try {
        const {tokens,id}=req.body
        const decode=await jwt.verify(tokens,process.env.KEY)
        
        req.userID=decode._id
       
        const cart = await Mobiles.findOne({ id: id });
        

        const Usercontact = await User.findOne({ _id: req.userID });
        

        if (Usercontact) {
            const cartData = await Usercontact.addcartdata(cart);

            await Usercontact.save();
           
            res.status(201).json(Usercontact);
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;