import nodemailer, { Transporter } from "nodemailer"

interface Props {
  service: string
  email: string
  secretKey: string
}

export interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachements?: Attachement[]
}

export interface Attachement {
  filename: string
  path: string
}

export class EmailService {
  private transporter: Transporter

  constructor({ email, secretKey, service }: Props) {
    this.transporter = nodemailer.createTransport({
      service,
      auth: {
        user: email,
        pass: secretKey,
      },
    })
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      })
      console.log(sentInformation)
      return true
    } catch (error) {
      return false
    }
  }
}
