import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail(opts: MailOptions): Promise<void> {
  const { error } = await resend.emails.send({
    from: "32onHerold Holidays <onboarding@resend.dev>",
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
  if (error) throw new Error(error.message);
}
