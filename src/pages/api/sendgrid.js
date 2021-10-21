const sgMail = require('@sendgrid/mail')

export default async function (req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const { email } = req.body

  const content = {
    to: 'emilianoyaryurat@gmail.com',
    from: 'emilianoyaryurat@gmail.com',
    subject: `Nuevo mensaje de ${email}`,
    text: email,
    html: `<p>${email}</p>`
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error.response.body.errors)
    res.status(400).send('Message not sent.')
  }
}
