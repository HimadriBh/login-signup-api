import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String,
        enums: [
            'admin',
            'superadmin',
            'user'
        ],
        default: 'user'
    }
});

userSchema.pre('save', async function(next){
    const user = this;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

userSchema.methods.isValidPassword = async function(password){
    const user = this;
    const valid = bcrypt.compare(password, user.password);

    return valid;
}

export default mongoose.model('User', userSchema);