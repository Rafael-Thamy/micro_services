import User from "../model/User.js";

//database logic layer


class UserRepository {

    async findById(id) {
        try {
            return await User.findOne({ where: { id } })
        } catch (error) {
            console.log(error.message)
            return null
        }
    }


    async findByEmail(email) {
        try {
            return await User.findOne({ where: { email } })
        } catch (error) {
            console.log(error.message)
            return null
        }
    }
}

export default new UserRepository()