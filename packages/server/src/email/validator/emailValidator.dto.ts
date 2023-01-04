import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsArray } from 'class-validator';
import { Transform } from 'stream';

export class Email {
  @ApiProperty({ description: 'The email address of the sender', default: 'noreply@email.sail.codes', required: false })
  @IsEmail({ message: 'You need a proper email address' })
  from: string;

  @ApiProperty({ description: 'The email address to send to' })
  @IsEmail()
  to: string;

  @ApiProperty({ description: 'The subject of the email', example: 'Hello from Sail' })
  @Length(0, 50, { message: 'Subject body cannot exceed 50 chars' })
  subject: string;

  @ApiProperty({ description: 'The body of the email, plain text', example: 'Reaching out to say hi!' })
  @Length(0, 1000, { message: 'Message body cannot exceed 1000 chars' })
  message: string;

  @ApiProperty({ description: 'The email address to reply to', required: false })
  @IsEmail({ message: 'You need a proper email address' })
  replyTo?: string;

  @ApiProperty({ description: 'Add carbon copy email addresses', required: false })
  @IsArray()
  @IsEmail({ each: true, message: 'CC needs a proper email address' })
  cc?: string[];

  @ApiProperty({ description: 'Add blind carbon copy email addresses', required: false })
  @IsArray()
  @IsEmail({ each: true, message: 'BCC needs a proper email address' })
  bcc?: string[];
}
