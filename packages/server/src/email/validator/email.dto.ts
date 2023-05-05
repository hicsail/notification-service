import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, ValidateIf } from 'class-validator';

export class Email {
  @ApiProperty({ description: 'The email address of the sender', default: 'noreply@mail.sail.codes', required: false })
  @IsEmail({}, { message: 'You need a proper email address' })
  @IsOptional()
  from: string;

  @ApiProperty({ description: 'The email addresses to send to' })
  @IsArray()
  @IsEmail({}, { each: true, message: 'to must contain valid email addresses' })
  to: string[];

  @ApiProperty({ description: 'The subject of the email', example: 'Hello from Sail' })
  @IsString()
  subject: string;

  @ApiProperty({ description: 'The body of the email in plain text, required if no template is provided', example: 'Reaching out to say hi!', required: false })
  @IsString()
  @ValidateIf((email) => !email.template, { message: 'Must use a message if no template is present' })
  message: string;

  @ApiProperty({ description: 'The email address to reply to', required: false })
  @IsEmail({}, { message: 'Replay to must contain a valid email address' })
  @IsOptional()
  replyTo?: string;

  @ApiProperty({ description: 'Add carbon copy email addresses', required: false })
  @IsArray()
  @IsEmail({}, { each: true, message: 'CC must contain valid email addresses' })
  @IsOptional()
  cc?: string[];

  @ApiProperty({ description: 'Add blind carbon copy email addresses', required: false })
  @IsArray()
  @IsEmail({}, { each: true, message: 'BCC must contain valid email addresses' })
  @IsOptional()
  bcc?: string[];

  @ApiProperty({ description: 'Template name if using a template', required: false })
  @IsString()
  @ValidateIf((email) => !email.message, { message: 'Must use a template if no message is present' })
  template?: string;

  @ApiProperty({ description: 'Template data if using a template', required: false })
  @IsOptional()
  templateData?: any;

  // This is not a property of the class, but is used to store the rendered template
  renderedTemplate?: string;
}
