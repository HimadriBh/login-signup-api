import User from '../models/userModel.js'
import getUserToken from '../config/generateToken.js'

export const signup = async (req, res) => {
    let { name, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword || name === undefined || email === undefined || password === undefined || confirmPassword === undefined){
        return res.status(400).json({ success: false, message: "Please enter all the fields correctly!" })
    }
    const userExists = await User.findOne({ email:email });
    if(!userExists){
    try {

            await User.create({name, email, password});
            return res.status(201).json({
                success: true,
                message: "User created successfully!"
            })

        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }else {
            return res.status(400).json({success: false, message: 'User already exists.'})
        } 
}

export const signin = async (req, res) => {
    let { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user){
            return res.status(422).json({ success: false, message: "Invalid Email/Password!" })
        }else{
            const match = await user.isValidPassword(password);
            if(match){
                let token = getUserToken(user._id, user.role)
                return res.status(201).json({
                    success: true,
                    userInfo: {
                        id: user._id,
                        name: user.name,
                        role: user.role,
                        token: token,
                    }
                })
            }else{
                return res.status(422).json({ success: false, message: "Invalid Email/Password!" })
            }
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}