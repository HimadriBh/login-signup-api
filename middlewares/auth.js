import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        res.status(401);
        res.json({ message: "No token found, not authorized!" })
    }
    else{
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            const user = await User.findById(decoded.id).select('-password');

            req.user = user;
            next();
        })

    }
}
export default auth;