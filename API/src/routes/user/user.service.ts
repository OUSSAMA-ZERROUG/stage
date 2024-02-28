import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, users } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<users[]> {
    return this.prisma.users.findMany();
  }

  // async findOneByUsername(
  //   username: string,
  // ): Promise<UserWithRoleAndPerson> {
  //   return this.getBy({ username });
  // }

  // async findOneById(id: number): Promise<UserWithRoleAndPerson> {
  //   return this.getBy({ id });
  // }

  private async getBy(
    where: Prisma.usersWhereUniqueInput,
  ): Promise<UserWithRoleAndPerson> {
    const user = await this.prisma.users.findUnique({
      where,
      include: {
        person: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  // async updateOneById(
  //   id: number,
  //   data: Prisma.usersUpdateInput,
  // ): Promise<UserWithRoleAndPerson> {
  //   return this.updateBy({ id }, data);
  // }

  // async updateOneByUsername(
  //   username: string,
  //   data: Prisma.usersUpdateInput,
  // ): Promise<UserWithRoleAndPerson> {
  //   return this.updateBy({ username }, data);
  // }

  private updateBy(
    where: Prisma.usersWhereUniqueInput,
    data: Prisma.usersUpdateInput,
  ): Promise<UserWithRoleAndPerson> {
    return this.prisma.users.update({
      where,
      data,
      include: {
        person: true,
      },
    });
  }

  // async deleteRtHash(id: number): Promise<users> {
  // return this.prisma.users.update({
  //   where: { id },
  //   data: { rtHash: '' },
  // });
  // }
}
