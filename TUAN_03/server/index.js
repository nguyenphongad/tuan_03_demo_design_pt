const express = require('express');
const bodyParser  = require('body-parser');
const mongoose  = require('mongoose');
const dotenv  = require('dotenv');
const cors  = require('cors');

// routes
const AuthRoute = require('./Routes/AuthRoute.js');
const UserRouter = require('./Routes/UserRoute.js');
const PostRoute  = require('./Routes/PostRoute.js');
const UploadRoute = require('./Routes/UploadRoute.js');

const ChatRoute  = require('./Routes/ChatRoute.js');
const MessageRoute = require("./Routes/MessageRoute.js");

const path = require('path')

const app = express();

app.use(express.static('public'));
app.use('/images', express.static("images"));


app.use(bodyParser.json({limit:'30mb',extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended: true}));

app.use(cors());
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('listening at port ' + process.env.PORT);
        })
    })
    .catch((error)=>console.log(error));


app.use('/auth', AuthRoute)
app.use('/user', UserRouter)
// app.use('/post', PostRoute)
// app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use("/message", MessageRoute)

// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname1, "/client/build")))

//     app.get("*",(req, res)=>{
//         res.sendFile(path.resolve(__dirname1,"client","build","index.html"))
//     })

// }else{
//     app.get("/", (req, res)=>{
//         res.send("API is running successfuly")
//     })
// }

