const {DataTypes} = require("sequelize");
const { sequelize } = require("../config/db");


const Tasks = sequelize.define('Tasks',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING,
        },
        UUID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
        order:{
            type: DataTypes.FLOAT,
        },
        isCompleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        dueDate:{
            type:DataTypes.DATE,
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },{
        timestamps:true,
    }
)

// To maintain the order
Tasks.beforeCreate(async (task) => {
    const lastTask = await Tasks.findOne({
        order: [["order", "DESC"]],
    });

    task.order = lastTask
        ? lastTask.order + 1000
        : 1000;

});

module.exports = Tasks;