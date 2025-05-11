import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  DataType,
  Index,
} from 'sequelize-typescript';
import { User } from './User';
import { TaskListAttributes } from '../types/types';

@Table({
  tableName: 'task_lists',
  timestamps: true, // Automatically manage created_at and updated_at
})
export class TaskList extends Model<TaskListAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({ type: DataType.STRING })
  @Index // Index for the `list_name` column
  list_name: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  position: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  @Index // Index for the `user_id` column
  user_id: number;

  @BelongsTo(() => User) // Defines the relationship (Many-to-One) with User model
  user: User;

  // @CreatedAt
  // @Column({ type: DataType.DATE, field: 'created_at' })
  // created_at: Date;

  // @UpdatedAt
  // @Column({ type: DataType.DATE, field: 'updated_at', allowNull: true })
  // updated_at: Date;
}
