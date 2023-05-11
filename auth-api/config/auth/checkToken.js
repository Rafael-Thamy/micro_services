import jwt from "jsonwebtoken";
import { promisify } from "util";

import AuthException from "./AuthException.js";
import * as secrets from "../constants/secrets.js";
import * as httpStatus from "../constants/httpStatus.js";

const emptySpace = " ";


const bearer = "bearer"


export default async function (req, res, next) {
    try {
        let { authorization } = req.headers;
        if (!authorization) {
            throw new AuthException(httpStatus.UNAUTOHRIZED, "access token was not informed")
        }
        let accessToken = authorization
        if (accessToken.includes(emptySpace)) {
            accessToken = accessToken.split(emptySpace)[1]; //this is for remove the bearer word
        } else {
            accessToken = authorization
        }

        const decoded = await promisify(jwt.verify)(accessToken, secrets.API_SECRET)
        req.authUser = decoded.authUser
        return next()

    } catch (err) {
        const status = err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR;

        return res.status(status).json({
            status,
            message: err.message
        })
    }
}