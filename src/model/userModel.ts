import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const userModel = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

export default userModel