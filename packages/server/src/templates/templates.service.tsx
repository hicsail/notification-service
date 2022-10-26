import { Injectable } from '@nestjs/common';
import { passwordReset, sample, error } from './email_templates'

@Injectable()
export class TemplatesService {

  /// Step by step guideline
  /// 1) Create a new subdirectory in email_templates (e.g., passwordReset) and locate all relevant files in it
  /// 2) Export in index.js in email_templates
  /// 3) Import the newly created function above and add in the following object/dictionary
  templateStyles = {
    "sample": sample(),
    "passwordReset": passwordReset(),
    "error": error(),
  }

  getTemplate(template_name: string): any {
    if (!(template_name in this.templateStyles)) {
      return this.templateStyles["error"];
    } else {
      return this.templateStyles[template_name];
    }
  }
}
