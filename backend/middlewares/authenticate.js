import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;
    if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];
    }
    if(token){
        jwt.verify(token, config.jwtSecret, (err,decode)=>{
            if(err){
                res.status(401).json({ errors: {global: 'Failed to authenticate'}});
            }else{
                // check users
                let user = true;
                if(!user){
                    res.status(404).json({ errors: {global: 'No such user'}});
                }
                req.currentUser = decode;
                next();
            }
        });
    }else{
        res.status(403).json({
            errors: {global: 'No token provided' }
        });
    }

}