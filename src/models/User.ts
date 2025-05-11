// models/User.ts
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  DataType,
  Index,
} from 'sequelize-typescript';
import { UserAttributes } from '../types/types';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<UserAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  username: string;

  @Index
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column(DataType.STRING)
  password: string;

  // @CreatedAt
  // @Column({ type: DataType.DATE, field: 'created_at' })
  // created_at?: Date;
}
