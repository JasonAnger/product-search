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
    let range = `P2 (51-100)!B3:I800`;

    let response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID_1,
      range,
    });
    let products = response.data.values;

    range = `P3 (101-150)!B3:I800`;

    response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID_1,
      range,
    });
    products = products.concat(response.data.values);

    range = `P4 (151-200)!B3:I800`;

    response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID_1,
      range,
    });
    products = products.concat(response.data.values);
    
    range = `P5 (201-250)!B3:I800`;

    response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID_1,
      range,
    });
    products = products.concat(response.data.values);

    range = `samsclub.com!B3:I800`;

    response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID_1,
      range,
    });
    products = products.concat(response.data.values);

    range = `Petco!B3:I800`;

    response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID_1,
      range,
    });
    response.data.values = response.data.values.map(item => {
        item[6]=item[7]
        return item
    })
    products = products.concat(response.data.values);
    
    range = `TeamBeachBody!B3:I800`;

    response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID_1,
      range,
    });
    response.data.values = response.data.values.map(item => {
        item[6]=item[5]
        return item
    })
    products = products.concat(response.data.values);
    for(let i = 1; i<6; i++) {
        range = `P${i} (${i-1==0?0:(i-1)*50+1}-${i*50})!B3:I800`;

        response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID_2,
            range,
        });
        response.data.values = response.data.values.map(item => {
            item[6]=item[7]
            let temp = item[3]
            item[3]=item[2]
            item[2]=temp
            return item
        })
        products = products.concat(response.data.values);
    }
    //CONNECT DB
    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)

    await db.read()
    db.data = db.data || { products: [] } 
    
    products.forEach((item, index) => {
        if(item[0] !== "" || (item[2] !== "" && item[3] !== "")) db.data.products.push({name: item[0], sku: item[1], original: String(item[2]).includes("http")?item[2]:"", amazon: String(item[3]).includes("http")?item[3]:"", asin: item[6]})
        if(index%50==0) db.write()
    })

    await db.write().then(() => {

        res.json("OK")

    })
}
