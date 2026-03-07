export type ApiSuccessResponse = {
  success: true;
  message: string;
  data: any
};

export type ApiErrorResponse = {
  success?: false;
  error?: string;
  message?: string;
};