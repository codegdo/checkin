import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorService } from 'src/common';
import { FormRepository } from 'src/models/main/repositories';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(FormRepository)
    private formRepository: FormRepository,

    private readonly errorService: ErrorService,
  ) { }

  async getForm(dto: any) {
    try {
      return this.formRepository.getForm(dto);
    } catch (e) {
      this.errorService.handleError(e);
    }
  }
}
