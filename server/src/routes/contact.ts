import { Router } from "express";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { Client } from "@microsoft/microsoft-graph-client";
import { validateContact } from "../middleware/validate.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import { buildContactEmail } from "../templates/contactEmail.js";

export const contactRouter = Router();

contactRouter.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  next();
});

contactRouter.use("/contact", (req, res, next) => {
  if (req.method === "POST" && !req.is("application/json")) {
    res.status(415).json({ success: false, message: "Content-Type must be application/json." });
    return;
  }

  next();
});

const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
  },
});

async function getGraphClient(): Promise<Client> {
  const result = await msalClient.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  if (!result?.accessToken) {
    throw new Error("Failed to acquire OAuth2 access token");
  }

  return Client.init({
    authProvider: (done) => done(null, result.accessToken),
  });
}

contactRouter.post("/contact", rateLimiter, validateContact, async (req, res) => {
  try {
    const { name, email, company, phone, message } = req.body;
    const graphClient = await getGraphClient();

    await graphClient
      .api(`/users/${process.env.SMTP_USER}/sendMail`)
      .post({
        message: {
          subject: `New Contact Form Submission from ${name}`,
          body: {
            contentType: "HTML",
            content: buildContactEmail({ name, email, company, phone, message }),
          },
          from: {
            emailAddress: { address: process.env.SMTP_USER },
          },
          toRecipients: [
            { emailAddress: { address: "xarka.tech@xarka.in" } },
          ],
          replyTo: [
            { emailAddress: { address: email } },
          ],
        },
      });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email. Please try again later." });
  }
});
