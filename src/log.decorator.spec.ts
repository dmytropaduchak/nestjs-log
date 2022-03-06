import { Injectable, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import { Log } from './log.decorator';

class CustomLogger extends Logger {}

const logger = new CustomLogger();

const prefix = 'Test';

const timestamp = true;

const transform = (data: unknown) =>
  Array.isArray(data) ? { data } : { data };

@Injectable()
class Service {
  @Log() async test1(): Promise<void> {}
  @Log({ logger }) async test2(): Promise<void> {}
  @Log({ prefix }) async test3(): Promise<void> {}
  @Log({ timestamp }) async test4(): Promise<void> {}
  @Log({ transform }) async test5(): Promise<void> {}
}

describe('Log', () => {
  let sandbox: SinonSandbox;
  let testingModule: TestingModule;

  let service: Service;
  let debugLogger: SinonStub;
  let debugCustomLogger: SinonStub;

  beforeEach(async () => {
    sandbox = createSandbox();

    testingModule = await Test.createTestingModule({
      providers: [Service],
    }).compile();

    debugLogger = sandbox.stub(Logger.prototype, 'debug');
    debugCustomLogger = sandbox.stub(CustomLogger.prototype, 'debug');

    service = testingModule.get(Service);
  });

  afterEach(async () => {
    sandbox.restore();
  });

  it('should be use Logger debug', async () => {
    await service.test1();
    expect(debugLogger.calledTwice).toBeTruthy();
  });

  it('should be use CustomLogger debug', async () => {
    await service.test2();
    expect(debugCustomLogger.calledTwice).toBeTruthy();
  });

  it('should be use prefix', async () => {
    await service.test3();
    // expect(debugCustomLogger.calledTwice).toBeTruthy();
  });

  it('should be use timestamp', async () => {
    await service.test4();
    // expect(debugCustomLogger.calledTwice).toBeTruthy();
  });

  it('should be use transform', async () => {
    await service.test5();
    // expect(debugCustomLogger.calledTwice).toBeTruthy();
  });
});
