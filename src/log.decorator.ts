import { Logger, LoggerService } from '@nestjs/common';

export interface Options {
  logger?: LoggerService;
  prefix?: string;
  timestamp?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  prefix: 'Function',
  timestamp: true,
};

export const Log = (options = DEFAULT_OPTIONS) => {
  return (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ): void => {
    const logger = options?.logger || new Logger(target?.constructor?.name);
    const method = descriptor?.value;

    descriptor.value = async function <T>(...args: unknown[]): Promise<T> {
      const currentTime = Date.now();
      logger.debug(
        `${options?.prefix} "${propertyName}" invoke -> ${JSON.stringify(
          args,
        )}`,
      );

      const data = await method.apply(this, args);

      const executeTime = options?.timestamp
        ? `${Date.now() - currentTime}ms.`
        : '';
      logger.debug(
        `${options?.prefix} "${propertyName}" result -> ${JSON.stringify(
          data,
        )}${executeTime}`,
      );

      return data;
    };
  };
};
