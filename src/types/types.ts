export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
}

// // Define the shape of data required to create a new user
// export type UserInput = Omit<UserAttributes, 'id'>;

export interface CardCommentsAttributes {
  id: number;
  card_id: number;
  user_id: number;
  comment: string;
}

export interface CardAttributes {
  id: number;
  list_id: number;
  created_by: number;
  title: string;
  description: string;
  due_date: Date | null;
  priority: string;
  status: string;
  assigned_to: number | null;
  position: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskListAttributes {
  id?: number;
  list_name: string;
  position: number;
  user_id: number;
}
