import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { RedirectController } from './redirect.controller';
import { ClicksModule } from '../clicks/clicks.module';

@Module({
  imports: [ClicksModule],
  controllers: [LinksController, RedirectController],
  providers: [LinksService],
})
export class LinksModule {}
