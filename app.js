const path = require('path');
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const db = require("./confg/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require("./models/User");
const bodyParser = require("body-parser");
const passport = require('passport');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }


mongoose
    .connect(db,{useNewUrlParser:true})
    .then(()=>console.log("Connected to mongoDB"))
    .catch(err=>console.log(err))

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
app.get("/", (req,res)=> {
    const user = new User({
        handle: "jim",
        email: "jim@jim.jim",
        password: "jimisgreat123"
    })
    user.save();
    res.send("Hello Worl!")
});
app.use(passport.initialize());
require('./confg/passport')(passport)
app.use("/api/users", users)
app.use("/api/tweets", tweets)


const port = process.env.PORT || 5000;

app.listen(port, ()=> {console.log(`Listenining on port ${port}`)});