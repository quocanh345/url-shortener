import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { generateCode } from './code-generator';
import { ClicksService } from '../clicks/clicks.service';

import { Link } from '../generated/prisma/client';

const MAX_ATTEMPTS = 5;

function isUniqueViolation(err: unknown): boolean {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002'
  );
}

@Injectable()
export class LinksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clicksService: ClicksService,
  ) {}

  async create(dto: CreateLinkDto) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        return await this.prisma.link.create({
          data: { code: generateCode(), originalUrl: dto.url },
        });
      } catch (err) {
        if (isUniqueViolation(err)) continue;
        throw err;
      }
    }
    throw new InternalServerErrorException('Could not generate a unique code');
  }

  async getLinkByCode(code: string): Promise<Link | null> {
    const link = await this.prisma.link.findUnique({
      where: { code },
    });
    return link;
  }

  async resolveAndRecordClick(
    code: string,
    referrer: string | undefined,
  ): Promise<string | null> {
    const link = await this.getLinkByCode(code);
    if (!link) return null;
    this.clicksService.recordClick(link.id, referrer);
    return link.originalUrl;
  }
}
