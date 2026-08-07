import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendAccessNotification(username) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "Notificación de acceso TaskFlow",
    text: `El usuario ${username} ingresó al sistema.`,
    html: `
      <h3>Nuevo acceso</h3>
      <p>Usuario: <b>${username}</b></p>
      <p>Fecha: ${new Date()}</p>
    `,
  });
}