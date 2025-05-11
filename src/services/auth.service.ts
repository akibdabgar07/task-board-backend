import { User } from '../models/User';
import { UserAttributes } from '../types/types';

import { comparePassword, hashPassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';

// Service function to check if email exists
export const findUserByEmail = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

// Service function to hash the password
export const hashPasswordService = async (
  plainPassword: string
): Promise<string> => {
  return await hashPassword(plainPassword); // calling the utility function to hash the password
};

// Service function to create the user
export const createUserService = async (
  userInput: UserAttributes
): Promise<User> => {
  return await User.create(userInput); // Create the user record in the database
};

export const loginUser = async ({
  email,
  password,
}: UserAttributes): Promise<{ token: string }> => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = generateToken({
    userId: user.id, // not `id`, use actual model field
    email: user.email,
    username: user.username,
  });

  return { token };
};
