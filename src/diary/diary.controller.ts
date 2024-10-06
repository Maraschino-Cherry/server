import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { DiaryEntity } from './entities/diary.entity';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  create(@Body() createDiaryDto: CreateDiaryDto): Promise<DiaryEntity> {
    return this.diaryService.create(createDiaryDto);
  }

  @Get()
  getAllDiaries(): Promise<DiaryEntity[]> {
    return this.diaryService.getAllDiaries();
  }

  @Get(':id')
  getDiary(@Param('id') id: string): Promise<DiaryEntity> {
    return this.diaryService.getDiary(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiaryDto: UpdateDiaryDto,
  ): Promise<DiaryEntity> {
    return this.diaryService.update(+id, updateDiaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diaryService.remove(+id);
  }
}
