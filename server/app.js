var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var cors = require("cors");
const User = require("./models/User");
const Message = require("./models/Message")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: "http://localhost:3000", optionsSuccessStatus: 200}));

// CONNECTING TO MONGODB
const url = "mongodb://localhost:27017/project";
mongoose.connect(url);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind("Connection failed"));

// ROUTES

// ALL GET ROUTES

// GETTING CURRENTLY LOGGED IN USER
app.get('/user', async (req, res) => {
    const dbUser = await User.findOne({email: req.query.userEmail});
    res.send(dbUser);
})

// GETTING ALL OTHER USERS FOR THE TINDER CARDS
app.get('/allusers', async (req, res) => {
    const allUsers = await User.find({email: {$ne : req.query.email}})
    res.send(allUsers);
})

// GETTING ALL USERS THAT HAVE MATCHED WITH LOGGED IN USER
app.get('/matchedusers', async (req, res) => {
    const tempAccount = await User.findOne({email: req.query.email});
    const matchesAccounts = [];
    for(const match of tempAccount.matches) {
        let account = await User.findOne({email: match.email})
        matchesAccounts.push(account);
    }
    res.send(matchesAccounts);
})

// GET ALL MESSAGES SENT FROM userEmail TO chatterEmail
app.get('/getmessages', async (req, res) => {
    const { userEmail, chatterEmail } = req.query;
    const query = {
        sender_email: userEmail, receiver_email: chatterEmail 
    }
    const foundMessages = await Message.find(query);
    res.send(foundMessages);
    
})

// ALL POST ROUTES

// NEW ACCOUNT CREATION
app.post('/createaccount', async (req, res) => {
    const { email, name, age, description, password } = req.body;
    const lowerEmail = email.toLowerCase();
    const tempAccount = await User.findOne({email: lowerEmail});
    // FAILED IF EMAIL IS ALREADY IN USE
    if(!tempAccount) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email: lowerEmail,
                name: name,
                age: age,
                description: description,
                password: hashedPassword
            });
            await newUser.save();
            const tempAccount = await User.findOne({email: email});
            let token = jwt.sign(
                {email: email},
                process.env.SECRET,
                {expiresIn: 300,}
            );
            res.status(201).json({token, userID: tempAccount._id.toString(), userEmail: lowerEmail})
        } catch {
            res.send("Failed");
        }
    } else {
        res.status(403).send({email: "Email already in use."})
    }
})

// LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const tempAccount = await User.findOne({email: email});
    // FAILED LOGIN IF USER DOES NOT EXIST
    if(!tempAccount) { 
        res.status(403).send("Login failed");
    } else {
        bcrypt.compare(password, tempAccount.password, (error, matched) => {
            if(error) throw error;
            if(matched) {
                let token = jwt.sign(
                    {email: email},
                    process.env.SECRET,
                    {expiresIn: 300,}
                )
                res.status(201).json({token, userID: tempAccount._id.toString(), userEmail: email});
            }
        })
    }
})

// ADDS A LIKED USER
app.post('/matched', async (req, res) => {
    const tempAccount = await User.findOne({email: req.body.currentEmail});
    const result = tempAccount.matches.find(({email}) => email === req.body.swipedEmail);
    // CHECK IF USER IS ALREADY LIKED
    if(!result) {
        const user = await User.updateOne(
            {
                email: req.body.currentEmail
            },
            {
                $push: {matches: {email: req.body.swipedEmail}}
            }
        )
        console.log("New match added");
        res.send(user);
    } else {
        res.send("already matched");
    }
    
})
 // SAVES A NEW MESSAGE
app.post('/addmessage', async (req, res) => {
    const insertedMessage = new Message(req.body.newMessage);
    await insertedMessage.save();
    res.send(insertedMessage);
})

// SAVES EDITED USER DATA
app.post('/editaccount', async (req, res) => {
    const query = { email: req.body.userData.email }
    const updatedValues = {}

    // HERE WE CHECK IF THE VALUES ARE NOT EMPTY
    if(req.body.userData.name) {
        updatedValues['name'] = req.body.userData.name
    }

    if(req.body.userData.age) {
        updatedValues['age'] = req.body.userData.age
    }

    if(req.body.userData.description) {
        updatedValues['description'] = req.body.userData.description
    }

    // THIS FAILS IF AGE IS NOT NUMBER
    try {
        const tempAccount = await User.updateOne(query, updatedValues);
        res.send(tempAccount);
    } catch (error) {
        console.log("Failed");
        res.send("");
    }
})


module.exports = app;
