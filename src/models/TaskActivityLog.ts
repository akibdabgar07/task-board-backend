import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
  CreatedAt,
  Index,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'task_activity_log',
  timestamps: true,
  updatedAt: true,
  indexes: [
    {
      name: 'idx_user_action',
      fields: ['user_id', 'action_type'],
    },
    {
      name: 'idx_entity',
      fields: ['entity_type', 'entity_id'],
    },
  ],
})
export class TaskActivityLog extends Model<TaskActivityLog> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  log_id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.STRING)
  action_type: string;

  @Column(DataType.STRING)
  entity_type: string;

  @Column(DataType.INTEGER)
  entity_id: number;

  @Column(DataType.TEXT)
  message: string;

  // @CreatedAt
  // @Column({ type: DataType.DATE })
  // created_at: Date;
}
