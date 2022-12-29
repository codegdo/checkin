import { SetMetadata } from "@nestjs/common";
import { AccessLevelEnum } from "src/models/main";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AccessLevelEnum[]) => SetMetadata(ROLES_KEY, roles)