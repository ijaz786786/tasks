const express = require('express');
//create a server
const cors=require('cors');
const server=express();
server.use(cors());
const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error));

  const productschema = new mongoose.Schema({
    name: 
    {
        type:String,
        required: true}
        ,
    price: {
        type:Number,
        required: true}
  
  });
  const Item = mongoose.model('Item', productschema);
  


//creating a port
const port=5002;
const items=[
    {id:1,name:'jeans'},
    {id:2,name:'shorts'},
    {id:3,name:'kurti'}


];
server.use(express.json());
// server.get('/',(req,res)=>{
//     res.end("server is running");

// }
// );
// server.get('/product',(req,res)=>{
//     res.json(items)

// }
// );
server.get('/product',async(req,res) =>{
    try{
        const items = await Item.find();
        res.json(items);
    } catch(error){
        res.status(500).json({ message : 'Error fetching product',error});
    }
}
);
// server.post('/product',(req,res)=>{
//       newItem={id:items.length+1,name:req.body.name};
//       items.push(newItem);
//       res.status(201).json(newItem);


// })
server.post('/product',async(req,res)=>{
    try{
        const newItem = new Item({
            name : req.body.name,
            price : req.body.price,
        })
    
    await newItem.save();
    res.status(201).json(newItem);
    } catch(error){
        res.status(400).json({ message : 'Error fetching product',error});
    }


});
// server.put('/product/:id',(req,res)=>{
//     const itemid=parseInt(req.params.id);
//     const itemIndex=items.findIndex((item)=>item.id===itemid);
//     if(itemIndex!== -1){
//      items[itemIndex].name=req.body.name;
//      res.json(items[itemIndex]);
//     }
//     else{
//      res.status(404).send('Item is not found in a database');
//     }
 
//  })
 server.put('/product/:id',async(req,res)=>{
    try{
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {name: req.body.name , price: req.body.price},
            {new : true}
        );
    
    if(updatedItem){
     res.json(updatedItem);
    }
    else{
     res.status(404).send('Item is not found in a database');
    }
}catch(error){
    res.status(400).json({ message : 'Error fetching product',error});
}

 
 });

// server.delete('/product/:id',(req,res)=>{
//    const itemid=parseInt(req.params.id);
//    const itemIndex=items.findIndex((item)=>item.id===itemid);
//    if(itemIndex!== -1){
//     const deleteItem=items.splice(itemIndex,1);
//     res.json(deleteItem);
//    }
//    else{
//     res.status(404).send('Item is not found in a database');
//    }

// });

server.delete('/product/:id',async(req,res)=>{
    try{
        const deleteItem = await Item.findByIdAndDelete(req.params.id,);
    
    if(deleteItem){
     res.json(deleteItem);
    }
    else{
     res.status(404).json({message:'Item is not found in a database'});
    }
}catch(error){
    res.status(400).json({ message : 'Error fetching product',error});
}

 
 });



server.listen(port,()=>
    console.log(`server is running on http://localhost:$(port)`)
);