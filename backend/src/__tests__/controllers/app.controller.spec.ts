import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from '../../controllers/app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
  });

  describe('root', () => {
    it('should return a confirmation message', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.root()).toBe('Backend server is running...');
    });
  });
});
