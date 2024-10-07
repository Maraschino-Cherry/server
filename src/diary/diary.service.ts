import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaryEntity } from './entities/diary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(DiaryEntity)
    private diaryRepository: Repository<DiaryEntity>,
  ) {}

  async create(createDiaryDto: CreateDiaryDto): Promise<DiaryEntity> {
    const { title, content } = createDiaryDto;
    const diary = this.diaryRepository.create({ title, content });

    await this.diaryRepository.save(diary);
    return diary;
  }

  async getAllDiaries(): Promise<DiaryEntity[]> {
    return await this.diaryRepository.find();
  }

  async getDiary(id: number): Promise<DiaryEntity> {
    return await this.diaryRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateDiaryDto: UpdateDiaryDto,
  ): Promise<DiaryEntity> {
    const diary = this.diaryRepository.findOne({ where: { id } });

    if (!diary) {
      throw new NotFoundException(`${id}의 다이어리가 없습니다.`);
    }

    await this.diaryRepository.update(id, updateDiaryDto);
    const updatedDiary = await this.diaryRepository.findOne({ where: { id } });
    return updatedDiary;
  }

  async remove(id: number): Promise<void> {
    const result = await this.diaryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`${id}의 다이어리가 없습니다.`);
    }
  }
}
