"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.route("/check-auth").get(isAuthenticated_1.isAuthenticated, userController_1.checkAuth);
router.route("/signup").post(userController_1.signup);
router.route("/login").post(userController_1.login);
exports.default = router;
