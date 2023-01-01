import { Injectable } from '@nestjs/common';
import {
  defineAbility,
  AbilityBuilder,
  createMongoAbility,
} from '@casl/ability';
import { IamService } from 'src/api/iam/iam.service';

@Injectable()
export class CaslAbilityService {
  constructor(private readonly iamService: IamService) {}

  async defineAbilityForUser(userId) {
    const userPolicy = await this.iamService.getUserPolicy();

    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    /*
      {
        Effect: 'Allow',
        Action: 'invite:getInvite',
        Resource: 'account:invite',
        Condition: ''
      }
    */

    // can('invite:getInvite', 'account:invite:*', {})
    // can('invite:getInvite', 'account:invite', {})

    /*
      services: all
        account
        iam

      views: all
        profile
        invite

      actions:
        invite:getInvite
        invite:postInvite
        profile:getProfile
        profile:updateProfile


    */

    const permission = [
      {
        effect: 'allow',
        action: ['profile:getProfile', 'profile:updateProfile'],
        resource: ['profile'],
        condition: '',
      },
      // {
      //   effect: 'deny',
      //   action: 'invite:getInvite',
      //   resource: 'all',
      //   condition: '',
      // },
      // {
      //   effect: 'allow',
      //   action: 'invite:*',
      //   resource: 'account:*',
      //   condition: '',
      // },
      // {
      //   effect: 'allow',
      //   action: 'invite:getInvite',
      //   resource: 'account:invite',
      //   condition: '',
      // },
      // {
      //   effect: 'allow',
      //   action: ['invite:getInvite', 'invite:postInvite'],
      //   resource: 'account:invite',
      //   condition: '',
      // },
      // {
      //   effect: 'allow',
      //   action: 'invite:getInvite',
      //   resource: 'account:invite',
      //   condition: '',
      // },
    ];

    permission.forEach(({ effect, action, resource, condition }) => {
      if (effect === 'allow') {
        can(action, resource);
      }
      if (effect === 'deny') {
        cannot(action, resource);
      }
    });

    return build();

    // return defineAbility((can, cannot) => {
    //   permission.forEach(({ effect, action, resource, condition }) => {
    //     if (effect === 'allow') {
    //       can(action, resource);
    //     }
    //     if (effect === 'deny') {
    //       cannot(action, resource);
    //     }
    //   });
    // });
  }
}
