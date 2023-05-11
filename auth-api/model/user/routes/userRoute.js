import { Router } from "express"
import UserController from "../controler/userController.js"
import checkToken from "../../../config/auth/checkToken.js"

const router = new Router()


router.post("/api/user/auth", UserController.getAccessToken)

//from here on, we have private endpoints, that require middleware token
router.use(checkToken);

router.get("/api/user/email/:email", UserController.findByEmail)






export default router;