require('dotenv').config();
const express=require('express');
const app=express();

// dotenv.config();
const PORT=process.env.PORT || 5000; 

app.listen(PORT,(err)=>{
if(err){
    console.log("Server is not started",err);
    return false;
}
console.log(`Server is running on port ${PORT}`);
});