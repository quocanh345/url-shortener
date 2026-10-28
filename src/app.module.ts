import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { LinksModule } from './links/links.module';
import { ClicksModule } from './clicks/clicks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    LinksModule,
    ClicksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
