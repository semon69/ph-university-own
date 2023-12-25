import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html:string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'smdemon3@gmail.com',
      pass: 'xwkw ggyv sdon nshi',
    },
  });
  await transporter.sendMail({
    from: 'smdemon3@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 minute', // Subject line
    text: 'Password change kor beda!', // plain text body
    html, // html body
  });
};
