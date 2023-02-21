const express = require('express');
const cors = require('cors');
const {StreamChat} = require('stream-chat'); 
const {v4} = require('uuid');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());
const api_key = 'mk3h8vqjbfmx';
const api_secret = 'qmp9ceerz6kd39ang74pcte2sxyxfmmrgrq3dwqeznybjhmrt8g2w9vdk2wmg9bm';
const serverClient =  StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async(req,res) => {
    try{
    const {firstName, lastName, username, password} = req.body;
    console.log(req.body)
    const userId = v4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({token , userId, firstName , lastName, username, hashedPassword})
    }catch(err){
      res.json(err)
    }
})
app.post("/login", async(req,res) => {
    try{
    const {username, password} = req.body
    const {users} = await serverClient.queryUsers({name: username});
    console.log(users);
    if(users.length === 0) {
        console.log('a');
        return res.json({msg: 'user not found'})

    }
    
    const token = serverClient.createToken(users[0].id)
    const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
    if(passwordMatch){
        res.json({token, 
            firstName: users[0].firstName,
            lastName: users[0].lastName,
            username,
            userId: users[0].id
        })
    }
    }catch(err){
        res.json({})
    }
})


app.listen(3001,()=>{
    console.log("listening on port 3001");
})