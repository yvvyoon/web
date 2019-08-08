module.exports = (sequelize, DataTypes) => {
    return sequelize.define('member', {
        user_id: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        identity_num: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        photo_path: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        loginTryCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        loginLockYn: {
            type: DataTypes.STRING(1),
            allowNull: true,
        }
    }, {
        timestamps: true,
    });
};