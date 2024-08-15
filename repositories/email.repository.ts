import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailRepository {
  public async sendEmail({
    to,
    subject,
    template,
  }: {
    to: string;
    subject: string;
    template: JSX.Element;
  }) {
    await resend.emails.send({
      from: 'info@dnmct.dev',
      subject,
      to,
      react: template,
    });
  }
}

export const emailRepository = new EmailRepository();
