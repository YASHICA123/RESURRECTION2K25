import type { RequestHandler } from "express";
import { google } from "googleapis";

function getPrivateKey(): string | undefined {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!raw) return undefined;
  return raw.includes("\\n") ? raw.replace(/\\n/g, "\n") : raw;
}

export const saveRegistration: RequestHandler = async (req, res) => {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME || "Registrations";
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = getPrivateKey();

    if (!spreadsheetId || !clientEmail || !privateKey) {
      const missing: string[] = [];
      if (!spreadsheetId) missing.push("GOOGLE_SHEETS_SPREADSHEET_ID");
      if (!clientEmail) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
      if (!privateKey) missing.push("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
      return res.status(500).json({ error: `Missing env: ${missing.join(", ")}` });
    }

    // Destructure the new fields
    const { name = "", email = "", phone = "", category = "", event = "", message = "", college = "", participation = "", members = [] } = req.body ?? {};

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields: name, email" });
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          timestamp,
          name,
          email,
          phone,
          category,
          event,
          message,
          college,
          participation,
          JSON.stringify(members)
        ]],
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Google Sheets saveRegistration error", err);
    return res.status(500).json({ error: err?.message || "Failed to save registration" });
  }
};

export const markPaid: RequestHandler = async (req, res) => {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME || "Registrations";
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = getPrivateKey();

    if (!spreadsheetId || !clientEmail || !privateKey) {
      const missing: string[] = [];
      if (!spreadsheetId) missing.push("GOOGLE_SHEETS_SPREADSHEET_ID");
      if (!clientEmail) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
      if (!privateKey) missing.push("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
      return res.status(500).json({ error: `Missing env: ${missing.join(", ")}` });
    }

    // Destructure team info if provided
    const { email, event, qrId, orderId, paymentId, college = "", participation = "", members = [] } = req.body ?? {};
    if (!email || !qrId) return res.status(400).json({ error: "Missing required fields: email, qrId" });

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const getResp = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
    });
    const rows = getResp.data.values || [];

    let rowIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowEmail = row[2] || ""; // C column
      const rowEvent = row[5] || ""; // F column
      if (rowEmail === email && (!event || rowEvent === event)) {
        rowIndex = i;
        break;
      }
    }

    const paidAt = new Date().toISOString();
    if (rowIndex >= 0) {
      const oneBased = rowIndex + 1;
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!L${oneBased}:O${oneBased}`, // adjust columns as per your sheet
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[
            "Paid",
            paymentId || "",
            orderId || "",
            qrId || "",
            college,
            participation,
            JSON.stringify(members)
          ]]
        },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [[
            paidAt,
            "",
            email,
            "",
            "",
            event || "",
            "",
            college,
            participation,
            JSON.stringify(members),
            "Paid",
            paymentId || "",
            orderId || "",
            qrId || ""
          ]],
        },
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Google Sheets markPaid error", err);
    return res.status(500).json({ error: err?.message || "Failed to update payment" });
  }
};
