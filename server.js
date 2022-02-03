const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/web");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
const passsportInit = require("./app/config/passport");
require("dotenv").config();

const PORT = process.env.PORT || 7000;

// db connection

const MONGODB_URI =
    "mongodb+srv://khaftab:aftab123@cluster0.lgin6.mongodb.net/realtime-pizza";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Db connected");
});

// sesion config
app.use(flash());

// const mongostore = new MongoDbStore({
//     mongooseConnnection: connection,
//     collection: 'sessions'
// })
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        store: MongoDbStore.create({
            mongoUrl: MONGODB_URI,
            collectionName: "sessions",
        }),
    })
);

// Passport config
passsportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// set global variable

app.use((req, res, next) => {
    res.locals.session = req.session; // session will be availabe in the frontend
    res.locals.user = req.user;
    next();
});

// set template engine

app.use(express.static(__dirname + "/client/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view-engine", "ejs");

app.set("views", path.join(__dirname, "client/resources/views"));

app.use(router);

app.listen(PORT, () => console.log("Server is up"));
