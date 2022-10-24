import { Length, IsEmail, IsArray } from 'class-validator';

export class Email<T = any> {
  @IsEmail({ message: 'You need a proper email address' })
  from: string;

  @IsEmail()
  to: string;

  @Length(0, 50, { message: 'Subject body cannot exceed 50 chars' })
  subject: string;

  @Length(0, 1000, { message: 'Message body cannot exceed 1000 chars' })
  message: T;

  @IsEmail({ message: 'You need a proper email address' })
  replyTo?: string;

  @IsArray()
  @IsEmail({ each: true, message: 'You need a proper email address' })
  cc?: string[];

  @IsArray()
  @IsEmail({ each: true, message: 'You need a proper email address' })
  bcc?: string[];
}