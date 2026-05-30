import { Controller, Get, Post, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { User } from 'src/db/schema';
import { ClassworksService } from './classwork.service';
import { CreateClassworkDto } from './dto/create-classwork.dto';

@ApiTags("Classworks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('classworks')
export class ClassworksController {
  constructor(private readonly classworksService: ClassworksService) {}

  @Post()
  @Roles("professor")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Cria uma nova lição (Classwork) com questões e a atribui a turmas" })
  async create(
    @CurrentUser() user: User, 
    @Body() createClassworkDto: CreateClassworkDto
  ) {
    return this.classworksService.create(user.id, createClassworkDto);
  }

  @Get('my-classrooms')
  @Roles("student")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Lista todas as lições (Classworks) disponíveis para o aluno logado" })
  async findMyClassworks(
    @CurrentUser() user: User
  ) {
    return this.classworksService.findMyClassworks(user.id);
  }

  @Get(':id')
  @Roles("student") 
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Retorna a lição completa detalhada e ordenada para o Player" })
  async findOneForPlayer(
    @Param('id') id: string
  ) {
    return this.classworksService.findOneForPlayer(id);
  }
}