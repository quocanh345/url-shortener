import {
  Controller,
  Get,
  Redirect,
  Param,
  Headers,
  NotFoundException,
} from '@nestjs/common';
import { LinksService } from './links.service';

@Controller()
export class RedirectController {
  constructor(private readonly linksService: LinksService) {}
  @Get(':code')
  @Redirect()
  async redirect(
    @Param('code') code: string,
    @Headers('referer') referer?: string,
  ) {
    const originalUrl = await this.linksService.resolveAndRecordClick(
      code,
      referer,
    );
    if (!originalUrl) {
      throw new NotFoundException('URL not found');
    }
    return { url: originalUrl, statusCode: 302 };
  }
}
