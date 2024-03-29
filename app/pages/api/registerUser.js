//import { User } from '../../utils/Users.js'
import dbConnect from '../../__database/dbConnect.js'
import Client from '../../__models/client.js'
import bcrypt from 'bcryptjs';

export default async function registerUser(req, res) {
    if (req.method === 'POST') {
        await dbConnect().catch(err => console.error(err));

        const { name, email, password } = req.body;

        const result = await Client.findOne({email})

        if (result) {
            res.status(409).json('User already exists under this email.');
        }
        else{
        const encryptedPassword = bcrypt.hashSync(password);
        const nameArr = name.split(' ');
        const firstName = nameArr[0];
        const lastName = nameArr[nameArr.length - 1];
        const newUser = await Client.create({
            email: email,
            password: encryptedPassword,
            profileSet: false,
            personalDetails: [{
                firstName: firstName,
                lastName: lastName,
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
}
}