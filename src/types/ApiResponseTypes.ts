export type ApiSuccessResponse = {
  success: true;
  message: string;
  data: {
    id: string;
  };
};

export type ApiErrorResponse = {
  success?: false;
  error?: string;
  message?: string;
};