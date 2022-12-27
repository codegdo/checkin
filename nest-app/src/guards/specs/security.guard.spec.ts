import { SecurityGuard } from '../security.guard';

describe('SecurityGuard', () => {
  it('should be defined', () => {
    expect(new SecurityGuard()).toBeDefined();
  });
});
