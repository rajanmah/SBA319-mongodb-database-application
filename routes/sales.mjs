import express from "express"
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb"


const router = express.Router()


//Defining schema for 'sales' collection
const salesSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["saleDate", "items", "items.name", "items.price", "items.quantity", "items.tags", "storeLocation", "customer", "customer.age", "customer.email", "customer.gender", "customer.satisfaction", "couponUsed", "purchaseMethod"],
        properties: {
            saleDate: {
                bsonType: "date",
                description: "date of sale",
            },
            name: {
                bsonType: "string",
                description: "must be a string"
            },
            items: {
                name: {
                    bsonType: "string",
                    description: "must be a string"
                },
                price: {
                    bsonType: "number",
                    description: "must be a number"
                },
                tags: {
                    bsonType: "array",
                    description: "must be an array"
                },
                quantity: {
                    bsonType: "number",
                    description: "must be a number"
                }
            },
            storeLocation: {
                bsonType: "string",
                description: "must be a string"
            },
            customer: {
                gender: {
                    bsonType: "string",
                    enum: ["M", "F"],
                    description: "must be a string and is either M or F",
                },
                age: {
                    bsonType: "int",
                    minimum: 18,
                    maximum: 100,
                    exclusiveMaximum: false,
                    description: "must be a integer in [18,100]"
                },
                email: {
                    bsonType: "string",
                    description: "must be an email"
                },
                satisfaction: {
                    bsonType: "int",
                    minimum: 1,
                    maximum: 10,
                    description: "must be a integer in [1,10]"
                }
            },
            storeLocation: {
                bsonType: "boolean",
                description: "must be a true or false"
            },
            purchaseMethod: {
                bsonType: "string",
                enum: ["In store", "Online"]
            }
        }
    }
};

// db.runCursorCommand({collMod: 'sales', validator: salesSchema});

//Get: Getting all data
router.get('/', async (req, res) => {
    const collection = await db.collection("sales")
    const results = await collection.find({}).limit(20).toArray()
    res.send(results).status(200)
})
//Get: Getting one data
router.get('/:id', async (req, res) => {
    const collection = await db.collection('sales')
    let query = { _id: new ObjectId(req.params.id) }
    const result = await collection.findOne(query)


    if (!result) 
        res.send('Data Not Found').status(404)
    else res.send(result).status(200)
})
//Post: Creating one data
router.post('/', async (req, res) => {
    const collection = await db.collection('sales', {validator:salesSchema})
    const newDocument = req.body // it should have unique key value
    // console.log(newDocument, req.body)
    newDocument.date = new Date() // Creates unique timestamp of creating new data
    const result = await collection.insertOne(newDocument)

    res.send(result).status(204)
})
//Patch: Updating one data
router.patch('/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const updates = {
        $set: req.body
    }
    // console.log(updates);
    const collection = await db.collection('sales', {validator:salesSchema})
    const result = await collection.updateOne(query, updates);

    if (!result)
        res.send('Data Not Found').status(404)
    else res.send(result).status(200)

});


//Delete: Deleting one data
router.delete('/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const collection = db.collection('sales')
    const result = await collection.deleteOne(query)

    if (!result)
        res.send('Data Not Found').status(404)
    else res.send(result).status(200)

})

export default router;