import { google } from "googleapis";
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

import * as fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function handler(req,res) {
    if(fs.existsSync(__dirname+"/db.json")) {
        fs.unlinkSync(__dirname+"/db.json")
    }

    //GET DATA FROM GOOGLE
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });
    const range = `P2 (51-100)!B3:E800`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });
    const products = response.data.values;

    //CONNECT DB
    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)

    await db.read()
    db.data = db.data || { products: [] } 
    
    products.forEach(item => {
        db.data.products.push({name: item[0], sku: item[1], walmart: item[2], amazon: item[3]})
    })

    await db.write()

    res.json("OK")
}
