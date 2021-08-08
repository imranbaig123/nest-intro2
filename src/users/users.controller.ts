import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    addUser(
        @Body('name') name: string,
        @Body('dob') dob: number,
        @Body('gender') gender: string,
        @Body('email') email: string,
    ) {
        const generateId = this.usersService.insertUser(
            name,
            dob,
            gender,
            email,
            );
        return { id:generateId };
    }
           
    @Get()
    getAllUsers() {
        return this.usersService.getUsers();
    }
    @Get(':id')
    getUser(@Param('id') userId: string,) {
    return this.usersService.getSingleUser(userId);
    }

   @Patch(':id')
    updateUser(
        @Param('id') id: string,
        @Body('name') name:string,
        @Body('dob') dob:number,
        @Body('gender') gender:string,
        @Body('email') email:string,
    ){
        this.usersService.updateUser(id, name, dob, gender, email);
        return null;        
    }

  @Delete(':id')
  removeUsers(@Param('id') userId: string,) {
    this.usersService.deleteUser(userId);
    return null;
    }
}