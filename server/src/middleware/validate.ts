import type { Request, Response, NextFunction } from "express";

function sanitize(str: string): string {
  return Array.from(str.trim().replace(/<[^>]*>/g, ""))
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join("");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(req: Request, res: Response, next: NextFunction): void {
  const { name, email, company, phone, message, website } = req.body;

  if (website) {
    res.status(400).json({ success: false, message: "Invalid request." });
    return;
  }

  if (!name || typeof name !== "string" || !name.trim()) {
    res.status(400).json({ success: false, message: "Name is required." });
    return;
  }
  if (name.length > 100) {
    res.status(400).json({ success: false, message: "Name must be 100 characters or less." });
    return;
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    res.status(400).json({ success: false, message: "Email is required." });
    return;
  }
  if (email.length > 255 || !EMAIL_RE.test(email.trim())) {
    res.status(400).json({ success: false, message: "Please provide a valid email address." });
    return;
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    res.status(400).json({ success: false, message: "Message is required." });
    return;
  }
  if (message.length > 1000) {
    res.status(400).json({ success: false, message: "Message must be 1000 characters or less." });
    return;
  }

  if (company !== undefined && (typeof company !== "string" || company.length > 100)) {
    res.status(400).json({ success: false, message: "Company must be 100 characters or less." });
    return;
  }

  if (phone !== undefined && (typeof phone !== "string" || phone.length > 20)) {
    res.status(400).json({ success: false, message: "Invalid phone number." });
    return;
  }

  // Sanitize inputs
  req.body.name = sanitize(name);
  req.body.email = email.trim();
  req.body.message = sanitize(message);
  if (company) req.body.company = sanitize(company);
  if (phone) req.body.phone = sanitize(phone);

  next();
}
