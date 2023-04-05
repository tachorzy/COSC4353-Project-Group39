//import { User } from '../../utils/Users.js'
import dbConnect from '../../__database/dbConnect.js'
import Client from '../../__models/client.js'
import bcrypt from 'bcryptjs';

export default async function registerUser(req, res){  
    
    await dbConnect().catch(err => console.log(err));

    const { name, email, password } = req.body;

    const result = await Client.findOne({
        email: email
    })

    if(result){
        res.status(500).json('User already exists under this email.')
    }
    
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    const nameArr = name.split(' ');
    const firstName = nameArr[0];
    const lastName = nameArr[nameArr.length - 1];
    const newUser = await Client.create({
        email: email,
        password: encryptedPassword,
        profileSet: true,
        personalDetails: [{
            FirstName: firstName,
            LastName: lastName,
            address1: "",
            address2: "",
            state: "",
            city: "",
            zip: "",
        }
        ]
    })
    res.status(200).json(newUser)
}