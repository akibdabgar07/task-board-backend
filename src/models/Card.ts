import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
  Default,
  CreatedAt,
  UpdatedAt,
  Index,
} from 'sequelize-typescript';
import { TaskList } from './TaskList';
import { User } from './User';
import { CardAttributes } from '../types/types';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { verifyToken } from '../utils/jwt.util';

@Table({
  tableName: 'cards',
  timestamps: true, // Automatically manage created_at and updated_at
})
export class Card extends Model<CardAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  card_id: number;

  @ForeignKey(() => TaskList)
  @Column(DataType.INTEGER)
  @Index
  list_id: number;

  @BelongsTo(() => TaskList, { foreignKey: 'list_id', as: 'list' })
  list: TaskList;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  created_by: number;

  @BelongsTo(() => User, { foreignKey: 'created_by', as: 'creator' })
  creator: User;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column({ type: DataType.DATE, allowNull: true })
  due_date: Date;

  @Default('medium')
  @Column(DataType.STRING)
  priority: string;

  @Default('pending')
  @Column(DataType.STRING)
  status: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  assigned_to: number;

  @BelongsTo(() => User, { foreignKey: 'assigned_to', as: 'assignee' })
  assignee: User;

  @Default(0)
  @Column(DataType.INTEGER)
  position: number;

  @CreatedAt
  @Column({ type: DataType.DATE })
  created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: true })
  updated_at: Date;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  debugger;
  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
  } else {
    const token = authHeader.split(' ')[1];
    debugger;
    try {
      const decoded = verifyToken(token);
      req.body.user = {
        userId: decoded.userId,
        username: decoded.username,
        email: decoded.email,
      };

      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
};
