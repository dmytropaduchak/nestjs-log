# 🇺🇦 HELP UKRAINE

We fight for democratic values, for freedom, for our future. We need your support. 
Solidarity with the Ukrainian people against the Russian invasion [Find out how you can help.](https://war.ukraine.ua/support-ukraine/).

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">
    A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">

[![Build Status](https://travis-ci.org/dmytropaduchak/nestjs-log.svg?branch=master)](https://travis-ci.org/dmytropaduchak/nestjs-log)
[![Coverage Status](https://coveralls.io/repos/github/dmytropaduchak/nestjs-log/badge.svg?branch=master)](https://coveralls.io/github/dmytropaduchak/nestjs-log?branch=master)
[![NPM Version](https://badge.fury.io/js/nestjs-log.svg)](http://badge.fury.io/js/nestjs-log?type=dev)


# NestJS Log

A simple log decorator or (TypeScript) for Nest framework (node.js) unified approach for class and function logging.

## Installation 

You can install this package using NPM:

```sh
npm i --save @dmytropaduchak/nestjs-log
```

## How use

Example with simple implementation:

```typescript
import { Log } from '@dmytropaduchak/nestjs-log';

class Service {
  @log() async test(): Promise<void> {}
}
```

Example with custom looger implementation:

```typescript
import { LoggerService } from '@nestjs/common';
import { Log } from '@dmytropaduchak/nestjs-log';

class CustomLogger extends LoggerService {}

const logger = new CustomLogger();

class Service {
  @log({ logger }) async test(): Promise<void> {}
}
```

Example with transform logging data implementation:

```typescript
import { LoggerService } from '@nestjs/common';
import { Log } from '@dmytropaduchak/nestjs-log';

class MyLogger extends LoggerService {}

const logger = new MyLogger();

const transform = (key, value) => [key, value];

class Service {
  @log({ logger, transform }) async test(): Promise<void> {}
}
```

Example with override default  log options implementation:

```typescript
import { Log } from '@dmytropaduchak/nestjs-log';

const timestamp = true;
const prefix = 'Test';

class Service {
  @log({ prefix, timestamp }) async test(): Promise<void> {}
}
```

## Unit testing

For run unit tests, use:

```
npm run test
```

All unit test report you can find at `report/` folder.

For run test at watch mode, use:

```
npm run test:dev
```


## Linting

For check eslint rules, use:

```
npm run lint
```

For auto fix all eslint bugs, use:

```
npm run lint:fix
```

## License

Nest is [MIT licensed](LICENSE).
