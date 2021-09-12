var express = require("express");
const router = express.Router();

const homeController = require("../controllers/home-controller");

router.get("/", homeController.home);

router.get("/contato", homeController.contato);

module.exports = router;