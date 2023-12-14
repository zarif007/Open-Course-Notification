import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { NotificationService } from './notification.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification fetched successfully',
    data: result,
  });
});

export const NotificationController = {
  insertIntoDB,
  getAllFromDB,
};
