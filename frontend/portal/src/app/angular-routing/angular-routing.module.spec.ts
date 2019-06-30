import { AngularRoutingModule } from './angular-routing.module';

describe('AngularRoutingModule', () => {
  let angularRoutingModule: AngularRoutingModule;

  beforeEach(() => {
    angularRoutingModule = new AngularRoutingModule();
  });

  it('should create an instance', () => {
    expect(angularRoutingModule).toBeTruthy();
  });
});
