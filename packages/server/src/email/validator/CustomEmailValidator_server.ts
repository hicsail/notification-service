import { Validate, Length, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { CustomEmailArray } from './CustomEmailArray';

export class mailbody< T= any> {
  @IsEmail({message: 'You need a proper email address'})
  from: string;

  @IsEmail()
  to: string;

  @Length(0, 50, {message: 'Subject body cannot exceed 50 chars'})
  subject: string;
  
  @Length(0, 1000, {message: 'Message body cannot exceed 1000 chars'})
  message: T;

  @IsEmail({message: 'You need a proper email address'})
  replyTo?: string;

  @Validate(CustomEmailArray, {message: 'Check your cc is all address'})
  @IsArray()
  cc?: string[];
  
  @Validate(CustomEmailArray, {message: 'Check your bcc is all address'})
  @IsArray()
  bcc?: string[];
}
