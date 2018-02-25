import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { App } from '../../controllers/app';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [App],
    }).compile();
  });

  describe('root', () => {
    it('should return a confirmation message', () => {
      const appController = app.get<App>(App);
      expect(appController.root()).toBe('Backend server is running...');
    });
  });
});
