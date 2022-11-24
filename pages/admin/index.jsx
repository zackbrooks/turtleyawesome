import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import Link from "next/link"
import axios from "axios";
import { useState } from "react";

const Index = ({pizza, order}) => {
//   console.log("order", order)
  const [pizzaList, setPizzaList] = useState(pizza)
  const [orderList, setOrderList] = useState(order)
  const handleDelete = async (id) =>{
    try {
        const res = await axios.delete(`http://localhost:3000/api/products/${id}`)
        setPizzaList(pizzaList.filter(pizza => pizza._id !== id))
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className={styles.container}>
        <div className={styles.item}>
            <h1 className={styles.title}>Products</h1>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </tbody>
                <tbody>
                    {pizzaList.map(pizza => (
                    <tr key={pizza._id}>
                        <td><Image src={pizza.img} width={50} height={50} objectFit='cover' alt=""/></td>
                        <td>{pizza._id}</td>
                        <td>{pizza.title}</td>
                        <td>{pizza.prices.join(',')}</td>
                        <td>
                           <button className={styles.button}>Edit</button>
                            <button className={styles.button} onClick={(e) => handleDelete(pizza._id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.item}>
            <h1 className={styles.title}>Orders</h1>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </tbody>
                <tbody>

                    <tr key=''>
                        <td>3534254253434</td>
                        <td>Zeke Brooks</td>
                        <td>$34.44</td>
                        <td>Paid</td>
                        <td>Preparing</td>
                        <td>
                           <button className={styles.button}>Next Stage</button>
                            <button className={styles.button}>Delete</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
  )
}

export const getServerSideProps = async () => {
    const res = await axios.get(`http://localhost:3000/api/products`)
    const ordersData = await axios.get(`http://localhost:3000/api/orders`)
    console.log("Orders When They Get To Frontend", ordersData.data)
    
    return {
      props:{
        pizza: res.data,
        order: ordersData.data
      }
    }
  }

  
export default Index