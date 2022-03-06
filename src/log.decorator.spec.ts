import { Injectable, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import { Log } from './log.decorator';

@Injectable()
class Service {
  @Log() async test(): Promise<void> {}
}

describe('Log', () => {
  let sandbox: SinonSandbox;
  let testingModule: TestingModule;

  let service: Service;
  let debug: SinonStub;

  beforeEach(async () => {
    sandbox = createSandbox();

    testingModule = await Test.createTestingModule({
      providers: [Service],
    }).compile();

    debug = sandbox.stub(Logger.prototype, 'debug');
    service = testingModule.get(Service);
  });

  afterEach(async () => {
    sandbox.restore();
  });

  it('should be use Logger debug', async () => {
    await service.test();
    expect(debug.calledTwice).toBeTruthy();
  });
});
