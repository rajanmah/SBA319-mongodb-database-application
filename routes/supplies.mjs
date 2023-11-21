import express from "express"
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb"


const router = express.Router()


//Get: Getting all data
router.get('/', async (req, res) => {
    const collection = await db.collection("sales")
    const results = await collection.find({}).limit(20).toArray()
    res.send(results).status(200)
})
//Get: Getting one data
router.get('/:id', async (req, res)=>{
    const collection = await db.collection('sales')
    let query = {_id:new ObjectId(req.params.id)}
    const result = await collection.findOne(query)
// for server not found (404)


if(!result)
res.send('Not Found').status(404)
else res.send(result).status(200)
})
//Post: Posting one data
router.post('/', async (req, res)=>{
    const collection = await db.collection('sales')
    const newDocument = req.body // it should have unique key value
console.log(newDocument, req.body)
newDocument.date = new Date() // gives date and time of creating new database
const result = await collection.insertOne(newDocument)


res.send(result).status(204)


})
//Patch: Updating one data


//Delete: Deleting one data




export default router;