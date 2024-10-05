module.exports = (sequelize, DataTypes) => {
    const skill = sequelize.define(
        "Skill",
        {   
           id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
           },

           skillName:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true,
            validate: {
                notEmpty: {
                    msg: "Please enter the skill name"
                }
            },
            set(value) {
                this.setDataValue("skillName", value?.trim());
              },
           }
        },
        {
            tableName:"skills",
            timestamps:false
        }
    )
    return skill
}