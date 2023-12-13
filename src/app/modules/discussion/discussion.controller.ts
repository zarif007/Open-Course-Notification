import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { DiscussionService } from './discussion.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscussionService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discussion created successfully',
    data: result,
  });
});

const getFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscussionService.getFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discussion fetched successfully',
    data: result,
  });
});

export const DiscussionController = {
  insertIntoDB,
  getFromDB,
};
