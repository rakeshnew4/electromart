// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "rakeshkolipaka4@gmail.com",
//     pass: "wowj frih ufme qikb", // App password
//   },
// });

// export async function sendOrderConfirmationEmail({
//   to,
//   orderId,
//   items,
//   totalAmount,
// }: {
//   to: string;
//   orderId: string;
//   items: any[];
//   totalAmount: number;
// }) {
//   const html = `
//     <h2>🎉 Order Confirmed!</h2>
//     <p>Your order <strong>#${orderId}</strong> has been successfully placed.</p>

//     <ul>
//       ${items
//         .map(
//           (item) =>
//             `<li>${item.name} × ${item.quantity} — ₹${item.price}</li>`
//         )
//         .join("")}
//     </ul>

//     <h3>Total: ₹${totalAmount}</h3>
//     <p>Thank you for shopping with us ❤️</p>
//   `;

//   await transporter.sendMail({
//     from: `"ElectroMart" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: `Order Confirmed - #${orderId}`,
//     html,
//   });
// }
