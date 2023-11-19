import { Body, Controller, Get, Post } from '@nestjs/common';

export class SignupUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export class LoginUserDto {
  readonly username: string;
  readonly password: string;
}

@Controller('auth')
export class AuthController {
  @Get('signup')
  getSignUpForm() {
    // Handle GET request to render the signup form
    return 'Render the signup form here';
  }

  @Post('signup')
  postSignUpForm(@Body() signupUserDto: SignupUserDto) {
    return `Received signup data: ${JSON.stringify(signupUserDto)}`;
  }

  @Post('login')
  postLoginForm(@Body() loginUserDto: LoginUserDto) {
    return {
      company: {
        id: 1,
        isActive: false
      },
      user: {
        firstName: 'giang',
        lastName: 'do',
        username: 'gdo',
        role: 'owner',
        roleType: 'Internal',
        //companyId: null,
        //companyIsActive: null,
        isOwner: false,
        isActive: true,
      },
      model: {
        app: {
          modules: [
            {
              name: 'admin',
              group: 'sys',
            },
          ],
          views: {
            admin: [
              {
                name: 'users',
                group: 'sys_admin',
              },
              {
                name: 'clients',
                group: 'sys_admin',
              },
              {
                name: 'migrations',
                group: 'sys_admin',
              },
            ],
          },
          objects: {
            users: [
              {
                name: 'user',
                slug: 'users',
              },
              {
                name: 'group',
                slug: 'groups',
              },
              {
                name: 'role',
                slug: 'roles',
              },
              {
                name: 'policy',
                slug: 'policies',
              },
            ],
            clients: [
              {
                name: 'account',
                slug: 'accounts',
              },
              {
                name: 'company',
                slug: 'companies',
              },
            ],
            migrations: [
              {
                name: 'migration',
                slug: 'migrations',
              },
              {
                name: 'migration_category',
                slug: 'migration-categories',
              },
              {
                name: 'migration_script',
                slug: 'migration-scripts',
              },
              {
                name: 'migration_rolback',
                slug: 'migration-rolbacks',
              },
            ],
          },
          actions: {
            migrations: [
              'assignScriptsToMigration',
              'getAllMigrations',
              'getMigrationById',
              'getScriptsForMigration',
              'getRollbacksForMigration',
              'createNewMigration',
              'migrationRunById',
              'migrationRollbackById',
              'getAllMigrationCategories',
              'getMigrationCategoryById',
              'createNewMigrationCategory',
              'getAllMigrationScripts',
              'getMigrationScriptById',
              'createNewMigrationScript',
            ],
          },
        },
      },
    };
  }
}
