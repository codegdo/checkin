import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { FormRepository, GroupRepository } from 'src/models/main/repositories';
import { TypeOrmExModule } from 'src/common';


@Module({
  imports: [
    TypeOrmExModule.forFeature([FormRepository, GroupRepository], 'default'),
  ],
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupModule { }
