import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { NotificationService } from './notification.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Notification created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await NotificationService.getAllFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification fetched successfully',
    data: result,
  });
});

const makeAllRead = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await NotificationService.makeAllRead(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification read successfully',
    data: null,
  });
});

export const NotificationController = {
  insertIntoDB,
  getAllFromDB,
  makeAllRead,
};
