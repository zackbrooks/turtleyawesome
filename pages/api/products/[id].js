import dbConnect from "../../../lib/mongo"
import Product from "../../../models/Product"



export default async function handler(req,res){
    const {method, query:{id}} = req

    dbConnect()
    if(method === 'GET'){
        try {
            const product = await Product.findById({_id: id})
            res.status(201).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    // if(method === 'PUT'){
    //     try {
            
    //         const product = await Product.create(req.body)
    //         res.status(200).json({message: "Pizza successfully added to database", data: { data: product} })
    //     } catch (error) {
    //         res.status(500).json(err)
    //     }
    // }
}