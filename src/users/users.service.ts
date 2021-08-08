import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './users.model';

@Injectable()
export class UsersService{
    private users: User[] = [];

  insertUser(name: string, dob: number,gender: string, email: string){
  const userId = Math.random().toString();        
  const newUser = new User(userId, name, dob, gender, email);
  this.users.push(newUser);
  return userId;
  }

  getUsers() {
  return [...this.users];
  }

  getSingleUser(userId: string) {
  const user = this.findUser(userId)[0];
  return {...user };
  }
 
  updateUser(userId: string, name: string, dob: number, gender: string, email: string){
  const [user, index] = this.findUser(userId);
  const updatedUser = {...user};
  if (name) {
  updatedUser.name = name;
  }
  if (dob) {
  updatedUser.dob = dob;
  }
  if (gender) {
  updatedUser.gender = gender;
  }
  if (email) {
  updatedUser.email = email;
  }
  this.users[index] = updatedUser;
  }

  deleteUser(userId: string) {
    const index = this.findUser(userId)[1];
    this.users.splice(index, 1);
  }

  private findUser(id: string): [User, number] {
  const userIndex = this.users.findIndex(user => user.id === id);
  const user = this.users[userIndex]
  if (!user){
  throw new NotFoundException('could not find user.');
  }
  return [user, userIndex];
  }    
  
}