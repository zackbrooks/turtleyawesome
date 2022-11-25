import dbConnect from "../../../lib/mongo"
import Product from "../../../models/Product"


export default async function handler(req,res){
    const {method} = req

    await dbConnect()

    if(method === 'GET'){
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if(method === 'POST'){
        try {
            const products = await Product.find()
            console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",products)
            
            const product = await Product.create(req.body)
            const products2 = await Product.find()
            console.log("TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",products2)
            res.status(201).json(product)
        } catch (error) {
            res.status(500).json(err)
        }
    }
}