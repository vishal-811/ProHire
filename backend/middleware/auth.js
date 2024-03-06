require('dotenv').config();
const jwt =require('jsonwebtoken');
const { User }  =require('../database/index')

const authMiddleware =async(req,res,next)=>{
     try {
        const authHeader =req.headers.authorization;
     if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401).json({msg:"Please login to acces this page"});
     }
     const token  = authHeader.split(' ')[1];
     const decoded =jwt.verify(token ,process.env.JWT_SECRET);
     if(!decoded){
        res.status(411).json({msg:"Invalid token"})
     }
     req.userId = decoded.userId;
     next();
     } catch (error) {
        console.error(error);
        res.status(411).json({msg:"verification failed"});
     }

}

module.exports={
    authMiddleware
}