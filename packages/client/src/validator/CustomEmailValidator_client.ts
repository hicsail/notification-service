import { object, string, array } from 'yup';

export async function validate(msg: object) {
  const emailSchema = object({
    from: string().required().email(),
    to: string().required().email(),
    subject: string().required(),
    message: string().required(),
    replyTo: string().email(),
    cc: array(string().email()),
    bcc: array(string().email())
  });
  const formattedEmail = emailSchema.cast(msg);
  const res = await emailSchema.validate(formattedEmail); // Returns warning if an error is present
  console.log('You have just sent: ', res);
  return formattedEmail;
}
