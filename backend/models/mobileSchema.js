const mongoose=require("mongoose")

const mobileSchema=new mongoose.Schema({
        id:String,
        category:String,
        detailUrl:String,
        title:Object,
        url:String,
        name:String,
        description:String,
        number: String,
        price :Object,
        discount:String,
        delivery:String
})


const Mobiles=new mongoose.model("Mobile",mobileSchema)

module.exports=Mobiles