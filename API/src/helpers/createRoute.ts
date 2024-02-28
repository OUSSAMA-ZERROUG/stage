// Ce script permet de créer une route avec un module, un contrôleur, un service et un DTO
// Il ajoute également le module créé à `app.module.ts`
// Exemple d'utilisation: `npm run create:route <routeName>`
import * as fs from 'fs/promises';
import * as prettier from 'prettier';

const createFolder = async (folderPath: string) => {
  try {
    await fs.mkdir(folderPath);
    console.log(`Folder created: ${folderPath}`);
  } catch (error) {
    console.log(`Error creating folder: ${folderPath}`, error);
  }
};

const createFile = async (filePath: string) => {
  try {
    await fs.appendFile(filePath, '');
    console.log(`File created: ${filePath}`);
  } catch (error) {
    console.log(`Error creating file: ${filePath}`, error);
  }
};

const format = async (content: string) => {
  const prettierConfig = await prettier.resolveConfig('./prettierrc');
  const contentFormatted = prettier.format(content, {
    ...prettierConfig,
    parser: 'typescript',
  });
  return contentFormatted;
};

const write = async (filePath: string, content: string) => {
  try {
    await fs.writeFile(filePath, await format(content));
    console.log(`File written: ${filePath}`);
  } catch (error) {
    console.log(`Error writing file: ${filePath}`, error);
  }
};

const writeDto = async (filePath: string, classRouteName: string) => {
  const dtoContent = `import { IsString } from 'class-validator';
  
  export class ${classRouteName}Dto {
    @IsString()
    readonly name: string;
  }
  `;
  await write(filePath, dtoContent);
};

const writeDtoIndex = async (
  filePath: string,
  lowerCaseRouteName: string,
) => {
  const dtoIndexContent = `
export * from './${lowerCaseRouteName}.dto';
`;
  await write(filePath, dtoIndexContent);
};

const writeModule = async (
  filePath: string,
  lowerCaseRouteName: string,
  classRouteName: string,
) => {
  const moduleContent = `
import { Module } from '@nestjs/common';
import { ${classRouteName}Service } from 'src/routes/${lowerCaseRouteName}/${lowerCaseRouteName}.service';
import { ${classRouteName}Controller } from 'src/routes/${lowerCaseRouteName}/${lowerCaseRouteName}.controller';

@Module({
  controllers: [${classRouteName}Controller],
  providers: [${classRouteName}Service],
  exports: [${classRouteName}Service],
})
export class ${classRouteName}Module {}
`;
  await write(filePath, moduleContent);
};

const writeService = async (
  filePath: string,
  lowerCaseRouteName: string,
  classRouteName: string,
) => {
  const serviceContent = `
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ${classRouteName}Dto } from 'src/routes/${lowerCaseRouteName}/dto';

@Injectable()
export class ${classRouteName}Service {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return \`This action returns all ${lowerCaseRouteName}s\`;
  }

  findOne(id: number) {
    return \`This action returns a #\${id} ${lowerCaseRouteName}\`;
  }
}
`;
  await write(filePath, serviceContent);
};

const writeController = async (
  filePath: string,
  lowerCaseRouteName: string,
  classRouteName: string,
) => {
  const controllerContent = `import { Controller } from '@nestjs/common';
import { ${classRouteName}Service } from 'src/routes/${lowerCaseRouteName}/${lowerCaseRouteName}.service';
import { ${classRouteName}Dto } from 'src/routes/${lowerCaseRouteName}/dto';

@Controller('${lowerCaseRouteName}')
export class ${classRouteName}Controller {
  constructor(private readonly ${lowerCaseRouteName}Service: ${classRouteName}Service) {}
}
`;
  await write(filePath, controllerContent);
};

const createAllFolders = async (
  routeFolder: string,
  dtoFolder: string,
) => {
  await createFolder(routeFolder);
  await createFolder(dtoFolder);
};

const createAllFiles = async (
  dtoFile: string,
  dtoIndexFile: string,
  moduleFile: string,
  controllerFile: string,
  serviceFile: string,
) => {
  await createFile(dtoFile);
  await createFile(dtoIndexFile);
  await createFile(moduleFile);
  await createFile(controllerFile);
  await createFile(serviceFile);
};

const writeAllFiles = async (
  dtoFile: string,
  dtoIndexFile: string,
  moduleFile: string,
  controllerFile: string,
  serviceFile: string,
  lowerCaseRouteName: string,
  classRouteName: string,
) => {
  await writeDto(dtoFile, classRouteName);
  await writeDtoIndex(dtoIndexFile, lowerCaseRouteName);
  await writeModule(moduleFile, lowerCaseRouteName, classRouteName);
  await writeService(serviceFile, lowerCaseRouteName, classRouteName);
  await writeController(
    controllerFile,
    lowerCaseRouteName,
    classRouteName,
  );
};

const addModuleToAppModule = async (
  appModuleFile: string,
  lowerCaseRouteName: string,
  classRouteName: string,
) => {
  const appModuleContent = await fs.readFile(appModuleFile, 'utf-8');
  const importStatement = `${classRouteName}Module`;

  // Extraire le tableau `imports` du fichier `app.module.ts`
  const importMatches = appModuleContent.match(
    /\bimports: \[([\s\S]*?)\n( *)\]/, // Regex pour récupérer le tableau `imports`. Prend en compte les modules avec des tableaux de configuration sur plusieurs lignes (comme ConfigModule)
  );
  const existingImports = importMatches ? importMatches[1] : '';
  // Ajouter la nouvelle importation au tableau `imports`
  const updatedImports = existingImports + `\n    ${importStatement}`;

  // Trier les importations par ordre alphabétique
  const sortedImports = updatedImports
    .split(/,\n( *)(?=[A-Z])/) // Regex pour séparer les importations par virgule et retour à la ligne, en prenant en compte les modules avec des tableaux de configuration sur plusieurs lignes (comme ConfigModule). C'est pourquoi on utilise une positive lookahead assertion pour matcher les majuscules
    .map(imp => imp.trim())
    .filter(Boolean)
    .sort();

  // Remplacer le tableau `imports` par les importations triées
  const updatedModuleContent = appModuleContent.replace(
    /\bimports: \[([\s\S]*?)\n( *)\]/, // Regex pour récupérer le tableau `imports`. Prend en compte les modules avec des tableaux de configuration sur plusieurs lignes (comme ConfigModule)
    `imports: [${sortedImports.join(',\n')}]`,
  );

  const newAppModuleContent =
    `import { ${classRouteName}Module } from 'src/routes/${lowerCaseRouteName}/${lowerCaseRouteName}.module';\n` +
    updatedModuleContent;

  write('src/app.module.ts', newAppModuleContent);
};

const createRoute = async (routeName: string) => {
  const lowerCaseRouteName = routeName.toLowerCase();
  const classRouteName =
    lowerCaseRouteName.charAt(0).toUpperCase() +
    lowerCaseRouteName.slice(1);
  routeName = routeName.toLowerCase();
  const routeFolder = `src/routes/${lowerCaseRouteName}`;
  const dtoFolder = `${routeFolder}/dto`;
  const dtoFile = `${dtoFolder}/${lowerCaseRouteName}.dto.ts`;
  const dtoIndexFile = `${dtoFolder}/index.ts`;
  const moduleFile = `${routeFolder}/${lowerCaseRouteName}.module.ts`;
  const controllerFile = `${routeFolder}/${lowerCaseRouteName}.controller.ts`;
  const serviceFile = `${routeFolder}/${lowerCaseRouteName}.service.ts`;
  try {
    await createAllFolders(routeFolder, dtoFolder);
    await createAllFiles(
      dtoFile,
      dtoIndexFile,
      moduleFile,
      controllerFile,
      serviceFile,
    );
    await writeAllFiles(
      dtoFile,
      dtoIndexFile,
      moduleFile,
      controllerFile,
      serviceFile,
      lowerCaseRouteName,
      classRouteName,
    );
    await addModuleToAppModule(
      'src/app.module.ts',
      lowerCaseRouteName,
      classRouteName,
    );
  } catch (error) {
    console.error(`Error creating route: ${routeName}`, error);
  }
};

const main = async () => {
  // Récupérer le nom de la route à partir des arguments de la ligne de commande
  const routeName = process.argv[2];

  if (!routeName) {
    console.error('Usage: ts-node createRoute.ts <routeName>');
  } else {
    // Exécution avec le nom de la route passé en argument
    createRoute(routeName);
  }
};

main();
