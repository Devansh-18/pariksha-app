export type ApiSuccessResponse = {
  success: true;
  message: string;
  data?: T;
};

export type ApiErrorResponse = {
  success?: false;
  error?: string;
  message?: string;
};