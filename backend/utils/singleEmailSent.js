const { transporter } = require("../config/nodemailer");
const logo = path.join(__dirname, "../public/icons/starlex.jpeg");
let logoBase64 = "";
try {
  if (fs.existsSync(logo)) {
    const logoBuffer = fs.readFileSync(logo);
    logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;
  }
} catch (error) {
  console.warn("Logo file not found, proceeding without logo:", error.message);
}
const sendEmail = async (email, subject, message) => {
  const baseUrl = process.env.BASE_URL || "https://starlex.co.ke";
  const mailOptions = {
    from: `"${fromName}" <${process.env.COMPANY_EMAIL}>`,
    to: email,
    subject,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            *{
          @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
             }
            body {
              margin: 0;
              padding: 0;
            font-family: "Outfit", sans-serif;
              background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%);
              min-height: 100vh;
            }
            .email-container {
              max-width:100%;
              margin: 20px auto;
              background: #ffffff;
              border-radius:2px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.15);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%);
              padding: 40px 20px;
              text-align: center;
              position: relative;
            }
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,0 1000,60 0,100"/></svg>');
              background-size: cover;
            }
            .logo {
              position: relative;
              z-index: 1;
              max-width: 120px;
              height: auto;
              margin-bottom: 15px;
              border-radius:2px;
              box-shadow: 0 8px 16px rgba(0,0,0,0.3);
              border: 3px solid rgba(255,255,255,0.2);
            }
            .company-name {
              position: relative;
              z-index: 1;
              color: #ffffff;
              font-size: 28px;
              font-weight: 700;
              margin: 0;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
              letter-spacing: 1px;
            }
            .tagline {
              position: relative;
              z-index: 1;
              color: rgba(255,255,255,0.95);
              font-size: 14px;
              margin: 8px 0 0 0;
              font-weight: 300;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .content {
              padding: 40px 30px;
              line-height: 1.8;
              color: #333333;
            }
            .message-content {
              font-size: 16px;
              margin-bottom: 30px;
            }
            .message-content h1, .message-content h2, .message-content h3 {
              color: #1e3a8a;
              margin-top: 25px;
              margin-bottom: 15px;
            }
            .message-content h1 {
              font-size: 24px;
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 10px;
            }
            .message-content h2 {
              font-size: 20px;
            }
            .message-content h3 {
              font-size: 18px;
            }
            .message-content p {
              margin-bottom: 15px;
            }
            .message-content a {
              color: #3b82f6;
              text-decoration: none;
              font-weight: 500;
              border-bottom: 1px solid transparent;
              transition: all 0.3s ease;
            }
            .message-content a:hover {
              border-bottom-color: #3b82f6;
              color: #1e3a8a;
            }
            .message-content ul, .message-content ol {
              padding-left: 20px;
              margin-bottom: 15px;
            }
            .message-content li {
              margin-bottom: 8px;
            }
            .message-content img {
              max-width: 100%;
              height: auto;
              margin: 15px 0;
              border-radius:2px;
              display: block;
              margin-left: auto;
              margin-right: auto;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .divider {
              height: 1px;
              background: linear-gradient(to right, transparent, #e0e7ff, transparent);
              margin: 30px 0;
            }
            .footer {
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              padding: 25px 30px;
              border-top: 1px solid #e2e8f0;
            }
            .social-links {
              text-align: center;
              margin-bottom: 20px;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              padding: 10px;
              background: linear-gradient(135deg, #3b82f6, #1e3a8a);
              color: white !important;
              text-decoration: none;
              border-radius:2px;
              width: 40px;
              height: 40px;
              text-align: center;
              line-height: 20px;
              transition: all 0.3s ease;
              font-weight: bold;
              font-size: 14px;
              box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
            }
            .social-links a:hover {
              background: linear-gradient(135deg, #1e3a8a, #06b6d4);
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
            }
            .unsubscribe {
              text-align: center;
              color: #64748b;
              font-size: 12px;
              margin-top: 15px;
            }
            .unsubscribe a {
              color: #3b82f6;
              text-decoration: none;
            }
            .unsubscribe a:hover {
              text-decoration: underline;
              color: #1e3a8a;
            }
            .company-info {
              text-align: center;
              color: #64748b;
              font-size: 13px;
              margin-bottom: 10px;
            }
            .cta-section {
              background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
              padding: 25px;
              border-radius:2px;
              text-align: center;
              margin: 25px 0;
              border: 1px solid #bfdbfe;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
              color: white !important;
              padding: 14px 28px;
              text-decoration: none;
              border-radius:2px;
              font-weight: 600;
              margin-top: 12px;
              transition: all 0.3s ease;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-size: 14px;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
            .cta-button:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
              background: linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%);
            }
            .tech-accent {
              background: linear-gradient(45deg, #f0f9ff, #e0f2fe);
              border-left: 4px solid #06b6d4;
              padding: 15px;
              margin: 20px 0;
              border-radius:2px;
            }
            
            @media only screen and (max-width: 600px) {
              .email-container {
                margin: 10px;
                border-radius:2px;
              }
              .header {
                padding: 30px 15px;
              }
              .content {
                padding: 25px 20px;
              }
              .footer {
                padding: 20px 15px;
              }
              .company-name {
                font-size: 22px;
              }
              .logo {
                max-width: 100px;
              }
              .message-content {
                font-size: 14px;
              }
              .social-links a {
                width: 35px;
                height: 35px;
                font-size: 12px;
                margin: 0 5px;
              }
              .cta-button {
                padding: 12px 24px;
                font-size: 13px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              ${
                logoBase64
                  ? `<img src="${logoBase64}" alt="Starlex Innovation Technologies Logo" class="logo">`
                  : ""
              }
              <h1 class="company-name">STARLEX INNOVATION</h1>
              <p class="tagline">Pioneering Technology Solutions</p>
            </div>
            
            <div class="content">
              <div class="message-content">
                ${message}
              </div>
              
              <div class="divider"></div>
              
              <div class="cta-section">
                <h3 style="color: #1e3a8a; margin-top: 0; font-size: 20px;">Stay Connected with Innovation</h3>
                <p style="margin: 12px 0; color: #64748b;">Thank you for being part of the Starlex Innovation Technologies community!</p>
                <div class="tech-accent">
                  <p style="margin: 0; color: #0f172a; font-weight: 500;">Leading the future of technology solutions</p>
                </div>
                <a href="${baseUrl}" class="cta-button">Explore Our Solutions</a>
              </div>
            </div>
            
            <div class="footer">
              <div class="social-links">
                <a href="${
                  process.env.FACEBOOK_URL || "#"
                }" title="Facebook">f</a>
                <a href="${
                  process.env.TWITTER_URL || "#"
                }" title="Twitter">𝕏</a>
                <a href="${
                  process.env.LINKEDIN_URL || "#"
                }" title="LinkedIn">in</a>
                <a href="${
                  process.env.INSTAGRAM_URL || "#"
                }" title="Instagram">ig</a>
                <a href="${
                  process.env.YOUTUBE_URL || "#"
                }" title="YouTube">▶</a>
              </div>
              
              <div class="company-info">
                <strong>STARLEX INNOVATION TECHNOLOGIES</strong><br>
                Leading Technology Solutions & Innovation<br>
                📧 ${process.env.COMPANY_EMAIL} | 📞 +254 713 457 529<br>
                🌐 ${baseUrl}
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
