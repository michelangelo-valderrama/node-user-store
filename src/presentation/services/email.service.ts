import nodemailer, { Transporter } from "nodemailer"

interface Props {
  service: string
  email: string
  secretKey: string
  postToProvider: boolean
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
  private postToProvider!: boolean

  constructor({ email, secretKey, service, postToProvider }: Props) {
    this.transporter = nodemailer.createTransport({
      service,
      auth: {
        user: email,
        pass: secretKey,
      },
    })
    this.postToProvider = postToProvider
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options

    try {
      if (!this.postToProvider) return true
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      })
      return true
    } catch (error) {
      return false
    }
  }
}
