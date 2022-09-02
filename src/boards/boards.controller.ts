import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ApiOperation, ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';


@ApiTags('board')
@Controller('api/boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
  private logger = new Logger('Boards');
  constructor(private boardsService: BoardsService) {}
  
  
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiOperation({ summary: '게시글 전체 조회' })
  @Get()
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.email} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  @ApiResponse({
    type: CreateBoardDto,
    status: 200,
    description: '성공',
  })
  @ApiOperation({ summary: '게시글 작성' })
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(`User ${user.email} creating a new board. 
        Payload: ${JSON.stringify(createBoardDto)} `);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: '게시물 id',
  })
  @ApiResponse({
    type: CreateBoardDto,
    status: 200,
    description: '성공',
  })
  @ApiOperation({ summary: '게시글 한 개 조회' })
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: '게시물 id',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiOperation({ summary: '게시글 삭제' })
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiOperation({ summary: '게시글 상태 변경' })
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
