const { login, register, postLogin, postRegister, logout } =
    require("../app/http/controller/authController")();
const cartController = require("../app/http/controller/customers/cartController");
const homeController = require("../app/http/controller/homeController");
const adminController = require("../app/http/controller/admin/orderController")();
const { store, index } = require("../app/http/controller/customers/orderController")();

// middlewares
const guest = require("../app/http/middlewares/guest");
const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");

const router = require("express").Router();

router.get("/", homeController().index);

router.get("/cart", cartController().index);

router.post("/update-cart", cartController().update);

router.get("/login", guest, login);

router.post("/login", postLogin);

router.get("/register", guest, register);

router.post("/register", postRegister);

router.post("/logout", logout);

// customer route

router.post("/order", auth, store);

router.get("/customer/orders", index);

// admin route

router.get("/admin/orders", admin, adminController.index);

module.exports = router;
