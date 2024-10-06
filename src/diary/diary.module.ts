import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryEntity } from './entities/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntity])],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
