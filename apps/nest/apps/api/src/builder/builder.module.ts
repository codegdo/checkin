import { Module } from '@nestjs/common';
import { FormModule } from './form/form.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    FormModule,
    RouterModule.register([
      {
        path: 'builder',
        module: BuilderModule,
        children: [
          {
            path: 'forms',
            module: FormModule,
          },
        ],
      },
    ]),
  ],
})
export class BuilderModule { }
