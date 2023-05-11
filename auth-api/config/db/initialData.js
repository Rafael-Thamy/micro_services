import User from "../../model/user/model/User.js";
import bcrypt from "bcryptjs";

export async function dataLoader() {
    try {
        await User.sync({ force: true })

        const hash = await bcrypt.hash("123456", 10)
        await User.create({
            name: "user teste1",
            email: "teste1@teste.com",
            password: hash

        })

        await User.create({
            name: "user teste2",
            email: "teste2@teste.com",
            password: hash

        })
    } catch (error) {
        console.log(error)
    }
}