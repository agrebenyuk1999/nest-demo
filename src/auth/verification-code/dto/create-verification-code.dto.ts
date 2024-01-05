export class CreateVerificationCodeDto {
  user_id: number;
  code: number;
  expires_at: Date;
  secret: string;
}
