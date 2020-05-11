'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define('Repository', {
    url: DataTypes.STRING
  }, {});
  Repository.associate = (models) => {
    // associations can be defined here
  };
  return Repository;
};
