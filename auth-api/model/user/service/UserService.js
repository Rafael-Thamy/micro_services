import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserException from "../exception/UserException.js";
import * as secrets from "../../../config/constants/secrets.js"


class UserService {

    async findByEmail(req) {

        try {
            const { email } = req.params
            const { authUser } = req

            this.requestValidation(email)
            let user = await UserRepository.findByEmail(email)
            this.validateUserNotFound(user)
            this.validateAuthenticatedUser(user, authUser)
            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.emai
                }
            }
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }

        }

    }
    requestValidation(email) {
        if (!email) {
            throw new UserException(httpStatus.BAD_REQUEST, "user email not stated")
        }
    }

    validateUserNotFound(user) {
        if (!user) {
            throw new Error(httpStatus.BAD_REQUEST, "user not found")
        }
    }

    validateAuthenticatedUser(user, authUser) {
        if (!authUser || user.id != authUser.id) {
            throw new UserException(httpStatus.FORBIDDEN, "you can not see this user data")
        }
    }

    async getAccessToken(req) {
        try {
            const { email, password } = req.body
            this.validateAccessTokenData(email, password)
            let user = await UserRepository.findByEmail(email)
            this.validateUserNotFound(user)
            await this.validatePassword(password, user.password)
            let authUser = {
                id: user.id,
                name: user.name,
                email: user.email
            }

            const accessToken = jwt.sign({ authUser }, secrets.API_SECRET, { expiresIn: "1d" })
            return {
                status: httpStatus.SUCCESS,
                accessToken
            }
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }
        }
    }

    validateAccessTokenData(email, password) {
        if (!email || !password) {
            throw new UserException(httpStatus.UNAUTOHRIZED, "email and password must be informed")
        }
    }

    async validatePassword(password, hashedPassword) {
        if (!await bcrypt.compare(password, hashedPassword)) {
            throw new UserException(httpStatus.UNAUTOHRIZED, "password not matched")
        }
    }


}


export default new UserService()