module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define(
        "Application",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            jobId: {
                type: DataTypes.UUID,
                allowNull: false,
               
            },
            skillId: {
                type: DataTypes.UUID,
                allowNull: false,
                
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
               
            },
            status: {
                type: DataTypes.ENUM('applied', 'under review', 'accepted', 'rejected'),
                allowNull: false,
            },
        },
        {
            tableName: 'applications',
            timestamps: true, 
        }
    );

    return Application;
};
