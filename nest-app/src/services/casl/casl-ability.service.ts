import { Injectable } from '@nestjs/common';
import { defineAbility } from '@casl/ability';
import { IamService } from 'src/api/iam/iam.service';

@Injectable()
export class CaslAbilityService {
  constructor(private readonly iamService: IamService) { }

  async defineAbilityForUser(userId) {
    const userPolicy = await this.iamService.getUserPolicy();
    const permission = [
      {
        action: 'account',
        subject: 'external'
      },
      {
        action: 'invite',
        subject: 'external'
      }
    ];
    return defineAbility((can) => {
      permission.forEach(p => {
        can(p.action, p.subject);
      });
    })
  }
}
