import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: 'emilianoyaryurat@gmail.com', // Your email where you'll receive emails
      from: 'emilianoyaryurat@gmail.com', // your website email address here
      subject: `${req.body.subject}`,
      html: `<div>You've got a mail from ${req.body.subject}</div>`
    })
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}

export default sendEmail
