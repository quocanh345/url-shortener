import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClicksService {
  constructor(private readonly prisma: PrismaService) {}
  recordClick(linkId: number, referrer: string | undefined): void {
    this.prisma.click
      .create({
        data: { linkId, referrer },
      })
      .catch((err) => {
        Logger.error(`Failed to record click for linkId ${linkId}: ${err}`);
      });
  }
}
