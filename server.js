import express from 'express';
import {hashPassword, verifyPassword} from './utils/securety.js'
import 'dotenv/config'
import {connectMongo} from './DB/mongodb.js'

const app = express();
app.use(express.json());
const port = process.env.PORT || 3002;


const db = await connectMongo({
    uri: process.env.URI,
    dbName: process.env.DBNAME
});


app.post('/signup', async (req,res) => {
    try{
        const {username, password} = req.body;
        const hashed = await hashPassword(password, 10);

        const data = await db.collection('users').find({username: username}).toArray();
        if(data.length > 0) {return res.status(400).json({message: "The user name has already been found."})}

        const result = await db.collection('users').insertOne({
            username, 
            password:hashed
        }) 
        res.status(201).json({msg:"The user has been saved successfully."})
    } catch(err){
        console.error(err);
        res.status(500).json({message: "The server could not connect."})
    }
})


const verifiedUsers  = {

}


app.post('/verify', async (req,res) => {
    try{
        const {username, password} = req.body;
        const data = await db.collection('users').find({username: username}).toArray();
        if(data.length === 0) {return res.status(400).json({message: "The stranger was not found."})}
        
        const ok = await verifyPassword(password, data[0].password)
        if(ok){ verifiedUsers[username] = true
            return res.status(200).json({msg:`${username} is Verified`})}
        else{return res.status(400).json({msg:`${username} is Unauthorized`})}
    } catch(err){
        console.error(err);
        res.status(500).json({message: "The server could not connect."})
    }
})



app.post('/decode-message', async (req,res) => {
    try{
        const {username, password} = req.body;
        if()
    }
})





app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})