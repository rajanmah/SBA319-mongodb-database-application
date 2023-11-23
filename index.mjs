import express from 'express'
const app = express()
const port = 3000

import sales from './routes/sales.mjs'


//middleware
app.use(express.json())
app.use('/sales', sales)


//error handling
app.use((err, req, res, next) => {
    res.status(500).send('Something went Wrong')
})



app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})