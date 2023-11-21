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

//Post: Posting one data

//Patch: Updating one data

//Delete: Deleting one data



export default router;