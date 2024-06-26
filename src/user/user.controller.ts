import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try{
      return await this.userService.create(createUserDto);
    }
    catch (error) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Get()
  findAll() {
    try{
      return this.userService.findAll();
    } 
    catch (error) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Get(':UUID')
  async findOne(@Param('UUID') UUID: string) {
    try{
      return await this.userService.findOne(UUID);
    }
    catch (error) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Patch(':UUID')
  async update(@Param('UUID') UUID: string, @Body() updateUserDto: UpdateUserDto) {
    try{
      return await this.userService.update(UUID, updateUserDto);
    }
    catch (error) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Delete(':UUID')
  remove(@Param('UUID') UUID: string) {
    try{
      return this.userService.remove(UUID);
    }
    catch (error) {
      return HttpStatus.BAD_REQUEST;
    }
  }

    //add new UUID to connectionsStarters of user with UUID
  @Patch(':UUID/:connectionUUID')
  async addConnectionStarter(@Param('UUID') UUID: string, @Param('connectionUUID') connectionUUID: string) {
    try{
      return await this.userService.addStarterConnection(UUID, connectionUUID);
    }
    catch (error) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  //delete connection from connectionsStarters of user with UUID
  @Delete(':UUID/:connectionUUID')
  async deleteConnectionStarter(@Param('UUID') UUID: string, @Param('connectionUUID') connectionUUID: string) {
    try{
      return await this.userService.deleteStarterConnection(UUID, connectionUUID);
    }
    catch (error) {
      return HttpStatus.BAD_REQUEST;
    }
  }

}
