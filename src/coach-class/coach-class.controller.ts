import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';

import { CoachClassService } from './coach-class.service';
import { CreateCoachClassDto } from './dto/create-coach-class.dto';
import { UpdateCoachClassDto } from './dto/update-coach-class.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateSessionDto } from 'src/session/dto/create-session.dto';
import { CreatePostDto } from 'src/post/dto/create-post.dto';

@Controller('coach-class')
export class CoachClassController {
  constructor(private readonly coachClassService: CoachClassService) {}

  @Post()
  create(@Body() createCoachClassDto: CreateCoachClassDto) {
    return this.coachClassService.create(createCoachClassDto);
  }

  @UseGuards(AuthGuard)
  @Post(':UUID/session')
  addSession(@Param('UUID') UUID: string, @Body() createSessionDto: CreateSessionDto) {
    return this.coachClassService.addSession(UUID, createSessionDto);
  }

  @UseGuards(AuthGuard)
  @Post(':UUID/post')
  addPost(@Request() req: any, @Param('UUID') UUID: string, @Body() createPostDto: CreatePostDto) {
    createPostDto.poster = req.user.sub;
    return this.coachClassService.addPost(UUID, createPostDto);
  }

  @Get()
  findAll() {
    return this.coachClassService.findAll();
  }

  @Get('forMember/:UUID')
  async findByMember(@Param('UUID') UUID: string) {
    try{ 
      return await this.coachClassService.findAllByMember(UUID);
    }
    catch(error){
      return new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  @Get('forOwner/:UUID')
  async findByOwner(@Param('UUID') UUID: string) {
    try{ 
      return await this.coachClassService.findAllByOwner(UUID);
    }
    catch(error){
      return new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':UUID')
  async findOne(@Param('UUID') UUID: string) {
    try{
      return await this.coachClassService.findOne(UUID);
    }
    catch (error) {
      return new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':UUID')
  update(@Param('UUID') UUID: string, @Body() updateCoachClassDto: UpdateCoachClassDto) {
    return this.coachClassService.update(UUID, updateCoachClassDto);
  }

  @Delete(':UUID')
  remove(@Param('UUID') UUID: string) {
    return this.coachClassService.remove(UUID);
  }
}
