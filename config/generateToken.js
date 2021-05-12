import jwt from 'jsonwebtoken'

export default function( id, role ){
    const token = jwt.sign({ id,  role }, process.env.JWT_SECRET);

    return token;
}