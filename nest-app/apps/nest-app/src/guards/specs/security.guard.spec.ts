import { SecurityGuard } from '../session.guard';

describe('SecurityGuard', () => {
  it('should be defined', () => {
    expect(new SecurityGuard()).toBeDefined();
  });
});
