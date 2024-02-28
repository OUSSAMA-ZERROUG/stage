import * as Excel from 'exceljs';

import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.person.findMany({
      where: {
        garde: {
          not: null,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async test() {
    // const filename =
    //   'C:\\Users\\lw295511\\OneDrive - GSK\\Documents\\Statut.xlsx';
    // let workBook = new Excel.Workbook();
    // await workBook.xlsx.readFile(filename);
    // let sheet = workBook.getWorksheet('Export') as Excel.Worksheet;
    // //get all data in first column
    // let col = sheet.getColumn(1);
    // let data = col.values;
    // //get unique values
    // let unique = data.filter((v, i, a) => a.indexOf(v) === i && v);
    // //delete first and last elements
    // unique.shift();
    // unique.pop();
    // //foreach unique value, find row index
    // let rows: number[] = [];
    // unique.forEach(value => {
    //   let row = data.indexOf(value);
    //   rows.push(row);
    // });
    // const names = rows.map((row, index) => {
    //   const name = sheet.getRow(row).getCell(2).value as string;
    //   return {
    //     name,
    //     id: unique[index],
    //   };
    // });
    // for (const name of names) {
    //   await this.prisma.person.upsert({
    //     where: {
    //       userID: name.id as string,
    //     },
    //     update: {
    //       name: name.name,
    //     },
    //     create: {
    //       userID: name.id as string,
    //       name: name.name,
    //     },
    //   });
    // }
    // return this.prisma.person.findMany();
  }
}
