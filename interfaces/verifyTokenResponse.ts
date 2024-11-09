export interface VerifyTokenResponse {
  error?: string;
  status?: number;
  info?: { email: string };
  verified?: boolean;
}
