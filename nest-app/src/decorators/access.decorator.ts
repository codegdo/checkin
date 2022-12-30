import { SetMetadata } from "@nestjs/common";
import { AccessLevelEnum } from "src/models/main";

export const ACCESS_KEY = 'access';
export const Access = (...access: AccessLevelEnum[]) => SetMetadata(ACCESS_KEY, access)