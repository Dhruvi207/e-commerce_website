const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const { type } = require("os");


//global variable

const currency='inr'
const deliverycharge=0

app.use(express.json());
app.use(cors());  //It is use to connect express to 4000 port

// Database connetion with mongodb
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL)

 




//API creation

app.get("/",(req,res)=>{    
    res.send("Express is running")
})

//Image storage Engine

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})

//creating upload endpoint for images

app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creating products

const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else
    {
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        price:req.body.price,
        
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})


// creating API for deleting products

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})




// creating API for getting all products

app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("All products fetched");
    res.send(products);
})


//Schema creating for user model

const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Creating endpoint for registering user

app.post('/signup',async(req,res)=>{

    let check=await Users.findOne({email:req.body.email});
    if(check)
    {
        return res.status(400).json({success:false,errors:"existing user found with same email id or email address"})
    }
    let cart={};

    for (let i = 0; i < 300; i++) {
        cart[i]=0;
        
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data={
        user:{
            id:user.id
        }
    }

    const token=jwt.sign(data,process.env.JWT_SECRET)
    res.json({success:true,token})
})


//Creating endpoint for user login

app.post('/login',async(req,res)=>{
   
   

 let user=await Users.findOne({email:req.body.email});
    if(user)
    {
        const passCompare=req.body.password === user.password;
        if(passCompare)
        {
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else
        {
            res.json({success:false,errors:"Wrong password"});
        }
    }
    else
    {
        res.json({success:false,errors:"Wrong Email id"})
    }
});

// creating endpoint for new collection data

app.get('/newcollections',async(req,res)=>{
    let products =await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("new collection fetch");
    res.send(newcollection);
})

// creating endpoint for popular in women

app.get('/popularinwomen',async (req,res)=>{
    let products =await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log("Popular in women fetch");
    res.send( popular_in_women);

})

//creating middelware to fetch user

const fetchuser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else
    {
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }
        catch(error){
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}



//creating endpoint for adding products in cart data

app.post('/addtocart', fetchuser, async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });

    // Update the cart data
    const itemId = req.body.itemId;
    if (user.cartData[itemId]) {
      user.cartData[itemId] += 1;
    } else {
      user.cartData[itemId] = 1;
    }

    // Save updated cart
    await Users.findByIdAndUpdate(req.user.id, { cartData: user.cartData });

    // ✅ Send updated cartData back
    res.json({ cartData: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});



//creating endpoint for removing products in cart data

app.post('/removefromcart',fetchuser,async(req,res)=>{
    console.log("romoved",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    {
    userData.cartData[req.body.itemId]-=1;
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

//creating  endpoint to get cart data

app.post('/getcart',fetchuser,async(req,res)=>{
    console.log("Get cart");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

//creating endpoint which is use to clear whole cart when order is placed


app.post('/clearcart', fetchuser, async (req, res) => {
    console.log("Clearing cart for user:", req.user.id);
    
    await Users.findByIdAndUpdate(req.user.id, { cartData: {} });
    
    res.send("Cart cleared");
});



//creating model for orders
const Orders=mongoose.model('Orders',{
    userid:{
        type:String,
        required:true,
    },
    items:{
        type:Array,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    address:{
        type:Object,
         required:true,
    },
    status:{
        type:String,
        required:true,
        default:'Order Placed',
    },
    paymentmethod:{
         type:String,
        required:true,
        default:'Stripe',
    },
    payment:{
        type:Boolean,
        required:true,
        default:false,
    },
    date:{
        type:Date,
        default:Date.now,
    },
   
})


//Placing order using cash on delivery

app.post('/placeorder', fetchuser, async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.user.id; 

        const orderData = {
            userid: userId,
            items,
            address,
            amount,
            paymentmethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new Orders(orderData);
        await newOrder.save();

        await Users.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

//Placing order using stripe


//stripe
require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

app.post('/placeOrderStripe',fetchuser,async(req,res)=>{
    
    try {
        const { items, amount, address } = req.body;
        const origin=req.headers.origin;
         const userId = req.user.id; 

        const orderData = {
            userid: userId,
            items,
            address,
            amount,
            paymentmethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

         const newOrder = new Orders(orderData);
        await newOrder.save();

        const line_items=items.map((item)=>({
            price_data:{
                currency: currency,
                product_data:{
                    name:item.name,
                   
                },
                unit_amount:item.price*100,
            },
            quantity:item.quantity,
        }));
        
       
const session=await stripe.checkout.sessions.create({
    success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode:'payment',
});
res.json({success:true,session_url:session.url});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
})


//verify stripe
app.post('/verifyStripe',fetchuser,async(req,res)=>{
    const {orderId,success,userId}=req.body

    try {
        if (success==="true") {
            await Orders.findByIdAndUpdate(orderId,{payment:true});
            await Users.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true});
        }
        else{
            await Orders.findByIdAndDelete(orderId);
            res.json({success:false})
        }
    } catch (error) {
         console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
})

//All Orders data for admin panel


app.post('/totalorders',async(req,res)=>{
    try {
        const orders=await Orders.find();
        res.json({success:true,orders})
    } catch (error) {
       console.error(error);
        res.status(500).json({ success: false, message: error.message });   
    }
})

//USer Order data for frontend

app.post('/userOrders',fetchuser,async(req,res)=>{
    try {
        
        const userId = req.user.id; 

        const orders=await Orders.find({userid:userId});

        res.json({success:true,orders})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
});


//update order status from admin panel
app.post('/updatestatus',async(req,res)=>{
    try {
        const {orderId,status}=req.body;
        console.log('Received update for:', { orderId, status });
        if (!orderId || !status) {
      return res.status(400).json({ success: false, message: 'Missing orderId or status' });
    }
        await Orders.findByIdAndUpdate(orderId,{status},{new:true});
        res.json({success:true,message:'Status updated'});
        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
})




app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port"+port);
    }
    else{
        console.log("Error:"+error);
    }
})