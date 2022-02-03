const { login, register, postLogin, postRegister, logout } =
    require("../app/http/controller/authController")();
const cartController = require("../app/http/controller/customers/cartController");
const homeController = require("../app/http/controller/homeController");
const guest = require("../app/http/middlewares/guest");
// guest prevent logged in users to visit login page
const router = require("express").Router();

router.get("/", homeController().index);

router.get("/cart", cartController().index);

router.post("/update-cart", cartController().update);

router.get("/login", guest, login);

router.post("/login", postLogin);

router.get("/register", guest, register);

router.post("/register", postRegister);

router.post("/logout", logout);

module.exports = router;
