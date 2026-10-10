import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  create(dto: CreateLinkDto) {
    return { received: dto.url }; // tiếp theo sẽ thay bằng lưu DB
  }
}
