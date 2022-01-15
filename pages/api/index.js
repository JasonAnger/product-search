// import { google } from "googleapis";

export default async function handler(req,res) {
    // const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    // const sheets = google.sheets({ version: 'v4', auth });
    // const range = `P2 (51-100)!B3:E800`;

    // const response = await sheets.spreadsheets.values.get({
    //   spreadsheetId: process.env.SHEET_ID,
    //   range,
    // });

    // const data = response.data;
    res.json("API Index")
}