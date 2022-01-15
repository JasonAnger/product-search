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
    if(req.query.name) {
        byName = new RegExp(`${req.query.name}`, 'g')
    }
    if(req.query.sku) {
        bySku = new RegExp(`${req.query.sku}`, 'g')
    }
    
    let {products} = db.data

    let result = products.filter((item) => {
        if(byName && bySku) {
            return (item.name.match(byName) && item.sku.match(bySku))
        }
        if(byName) {
            return item.name.match(byName)
        }
        if(bySku) {
            return item.sku.match(bySku)
        }
        return false
    })

    if(result.length == 0) {
        result = {products: products.slice(0,3)}
    } else {
        result = {products: result.slice(0,3)}
    }

    res.json(result)
}