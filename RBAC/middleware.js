const jwt = require('jsonwebtoken')
const User = require('./model/User')

// let role = 'admin'

// token {
//     id:'sdfhluskdhvksd',
//     role:'user'|| "admin"
// }

// ['admin',"user"]

const requireRole = (...role) =>{
    return async (req,res,next) =>{
          try {
     const token = req.headers.authorization?.split(' ')[1];
     if(!token){
         return res.staus(401).json({message:'no token recieved'})
     }
 
     const decoded = jwt.verify(token,process.env.SECRET);
     const user = await User.findById(decoded.id);
 
     if(!user) return res.status(404).json({message:"user doest not exist"});
 
    //  if(user.role !== role){
    //      return res.status(403).json({message:"Acess denied"})
    //  }

    if(!role.includes(user.role)){
            return res.status(403).json({message:"Acess denied"})
    }


 
     req.user = user
     next()
   } catch (error) {
    return res.status(401).json({message:"invalid token"})
   }
    }
}

// async function verifyUser(req,res,next) {
//     /*

//     we have to take token from header of req
//     decode the toke 
//     find user with same id we get from tokens id
//     compare the role of user with token. role
//     if its match then next

//     */
 

// }

module.exports = {requireRole}