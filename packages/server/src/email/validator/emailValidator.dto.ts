import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class Email {
  @ApiProperty({ description: 'The email address of the sender', default: 'noreply@email.sail.codes', required: false })
  @IsEmail({ message: 'You need a proper email address' })
  @IsOptional()
  from: string;

  @ApiProperty({ description: 'The email address to send to' })
  @IsEmail()
  to: string;

  @ApiProperty({ description: 'The subject of the email', example: 'Hello from Sail' })
  @Length(0, 50, { message: 'Subject body cannot exceed 50 chars' })
  @IsString()
  subject: string;

  @ApiProperty({ description: 'The body of the email, plain text', example: 'Reaching out to say hi!', required: false })
  @Length(0, 1000, { message: 'Message body cannot exceed 1000 chars' })
  @IsString()
  @IsOptional()
  message: string;

  @ApiProperty({ description: 'The email address to reply to', required: false })
  @IsEmail({ message: 'You need a proper email address' })
  @IsOptional()
  replyTo?: string;

  @ApiProperty({ description: 'Add carbon copy email addresses', required: false })
  @IsArray()
  @IsEmail({ each: true, message: 'CC needs a proper email address' })
  @IsOptional()
  cc?: string[];

  @ApiProperty({ description: 'Add blind carbon copy email addresses', required: false })
  @IsArray()
  @IsEmail({ each: true, message: 'BCC needs a proper email address' })
  @IsOptional()
  bcc?: string[];

  @ApiProperty({ description: 'Template name if using a template', required: false })
  @IsString()
  @IsOptional()
  template?: string;

  @ApiProperty({ description: 'Template data if using a template', required: false })
  @IsOptional()
  templateData?: any;

  // This is not a property of the class, but is used to store the rendered template
  renderedTemplate?: string;
}
