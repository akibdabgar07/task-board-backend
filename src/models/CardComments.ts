import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Card } from './Card';
import { User } from './User';
import { CardCommentsAttributes } from '../types/types';

@Table({
  tableName: 'card_comments',
  timestamps: true,
  indexes: [
    { fields: ['card_id', 'user_id'] }, // composite index
  ],
})
export class CardComment extends Model<CardCommentsAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Card)
  @Column(DataType.INTEGER)
  card_id: number;

  @BelongsTo(() => Card)
  card: Card;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.TEXT)
  comment: string;

  // @CreatedAt
  // @Column({ type: DataType.DATE })
  // created_at: Date;

  // @UpdatedAt
  // @Column({ type: DataType.DATE, allowNull: true })
  // updated_at: Date;
}
