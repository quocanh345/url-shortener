import {
  Controller,
  Get,
  Redirect,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { LinksService } from './links.service';

@Controller()
export class RedirectController {
  constructor(private readonly linksService: LinksService) {}
  @Get(':code')
  @Redirect()
  async redirect(@Param('code') code: string) {
    const originalUrl = await this.linksService.getOriginalUrlByCode(code);
    if (!originalUrl) {
      throw new NotFoundException('URL not found');
    }
    return { url: originalUrl, statusCode: 302 };
  }
}
