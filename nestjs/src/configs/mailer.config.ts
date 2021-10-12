export default {
  transport: {
    host: process.env.MAILER_HOST,
    port: 587,
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD
    }
  }
}