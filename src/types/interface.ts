interface TokenExpire {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TokenBody {
  success: boolean;
  tokenBody?: any;
  error?: Error;
}
