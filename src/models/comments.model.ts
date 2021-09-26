import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize";
import type { CommentType } from "../types";

const Comment = sequelize.define<CommentType>("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movieId: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  movieTitle: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  commenterIp: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      max: {
        args: [500],
        msg: "Comment exceed limit",
      },
    },
  },
});

export default Comment;
