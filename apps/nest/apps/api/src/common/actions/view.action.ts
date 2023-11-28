import { ClientAction } from '../../admin/client/client.action';
import { MigrationAction } from '../../admin/migration/migration.action';
import { MigrationCategoryAction } from '../../admin/migration/migration-category/migration-category.action';

function getLastKeysFromEnum(enumObject: string[]): string[] {
  return enumObject.map((value) => value.split(':').pop() as string);
}

const clientActionValues = Object.values(ClientAction).filter(
  (value) => typeof value === 'string',
);

const migrationActionValues = Object.values(MigrationAction).filter(
  (value) => typeof value === 'string',
);

const migrationCategoryActionValues = Object.values(
  MigrationCategoryAction,
).filter((value) => typeof value === 'string');

export type ActionType =
  | ClientAction
  | MigrationAction
  | MigrationCategoryAction;

export const viewAction = {
  clients: getLastKeysFromEnum(clientActionValues),
  migrations: [
    ...getLastKeysFromEnum(migrationActionValues),
    ...getLastKeysFromEnum(migrationCategoryActionValues),
  ],
};
