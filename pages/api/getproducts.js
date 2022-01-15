import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

export default async function handler(req,res) {
    await db.read()

    let byName = null
    let bySku = null
    let byAsin = null
    if(req.query.name) {
        byName = new RegExp(`${req.query.name}`, 'g')
    }
    if(req.query.sku) {
        bySku = new RegExp(`${req.query.sku}`, 'g')
    }
    if(req.query.asin) {
        byAsin = new RegExp(`${req.query.asin}`, 'g')
    }
    
    let {products} = db.data

    let result = products.filter((item) => {
        if(byName && bySku && byAsin) {
            return (String(item.name).match(byName) && String(item.sku).match(bySku) && String(item.asin).match(byAsin))
        }
        if(bySku && byAsin) {
            return (String(item.sku).match(bySku) && String(item.asin).match(byAsin))
        }
        if(byName && byAsin) {
            return (String(item.name).match(byName) && String(item.asin).match(byAsin))
        }
        if(byName && bySku ) {
            return (String(item.name).match(byName) && String(item.sku).match(bySku) )
        }
        if(byName) {
            return String(item.name).match(byName)
        }
        if(bySku) {
            return String(item.sku).match(bySku)
        }
        if(byAsin) {
            return String(item.asin).match(byAsin)
        }
        return false
    })

    let count = result.length - 3

    if(result.length == 0) {
        result = {products: products.slice(0,3)}
    } else {
        result = {products: result.slice(0,3)}
    }

    result.count = count

    res.json(result)
}