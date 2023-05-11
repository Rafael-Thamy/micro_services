import Sequelize from "sequelize";

//check if auth-db container name is not the cause of loading error
const sequelize = new Sequelize("auth-db", "admin", 123456, {
    host: "auth-db",
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        freezeTableName: true
    }

})

sequelize.authenticate()
    .then(() => {
        console.log("user connnected to database")
    })
    .catch((error) => {
        console.log(error.message)
    }

    )

export default sequelize