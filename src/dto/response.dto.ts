export class SuccessResponseDto<T> {
  status: boolean;
  data: T;
}

export class ErrorResponseDto {
  status: boolean;
  error: string;
}
