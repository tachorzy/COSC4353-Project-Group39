import dbConnect from '../../__database/dbConnect.js'
import History from '../../__models/history.js'
import { getSession } from "next-auth/react";

export default async function getUserHistory(req, res){
    if (req.method === "GET"){
        const session = await getSession({ req });

        if(!session){
            return res.status(401).json({message: "Unauthorized"})
        }

        dbConnect().catch(err => console.error(err));
        
        const result = await History.findOne({
            email: session.user.email,
        })

        if(result === null)
            return;
        
        result.quoteHistory.sort((h1, h2) => (h1.deliveryDate < h2.deliveryDate) ? 1 : -1)
    
        res.status(200).json(result.quoteHistory)
    }
    else {
        res.status(405).json({message: "Method Not Allowed"})
    }  
}