import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import Add from "../../components/Add";
import AddButton from "../../components/AddButton";
import dynamic from "next/dynamic";

const Index = ({admin}) => {
    const [pizzaList, setPizzaList] = useState([])
    const [orderList, setOrderList] = useState([])
    const [close, setClose] = useState(true)
    const AddDynamic = dynamic(() => import("../../components/Add"), {
        // suspense: true,
      });
      const AddDynamicButton = dynamic(() => import("../../components/AddButton"), {
        // suspense: true,
      });
    
  const orderStatus = ['Preparing', 'On The Way', 'Delivered']
  const handleDelete = async (id) =>{
    try {
        const res = await axios.delete(`https://turtleyawesome.vercel/api/products/${id}`)
        // const res = await axios.delete(`http://localhost:3000/api/products/${id}`)
        setPizzaList(pizzaList.filter(pizza => pizza._id !== id))
    } catch (error) {
        console.log(error)
    }
  }

  const handleStatus = async (id) => {
    const item = orderList.filter(order => order._id === id)[0]
    const currentStatus = Number(item.status)
    try {
        const res = await axios.put(`https://turtleyawesome.vercel/api/orders/${id}`, {status: Number(currentStatus) + 1})
        // const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {status: Number(currentStatus) + 1})
        setOrderList(preVal => preVal.map(order => {
            if(order._id === id){
                return res.data
            } else {
                return order
            }
        }))
    } catch (error) {
        console.log("error", error)
        
    }
  }

  const getAdminData = async () => {
    const productsData = await axios.get(`https://turtleyawesome.vercel.app/api/products`)
    const ordersData = await axios.get(`https://turtleyawesome.vercel.app/api/orders`)
    // const productsData = await axios.get(`http://localhost:3000/api/products`)
    // const ordersData = await axios.get(`http://localhost:3000/api/orders`)
    setOrderList(ordersData.data)
    setPizzaList(productsData.data)
  }

  useEffect(()=>{
    getAdminData()
  },[])

  return (
      <div className={styles.container}>
        <div className={styles.item}>
      {!close && <AddDynamic setClose={setClose}/>}
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
                    {pizzaList.map((pizza) => (
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
                    {admin && <AddDynamicButton setClose={setClose}/>}
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </tbody>
                <tbody>
                    {orderList.map((order) => (

                        <tr key={order._id}>
                        <td>{order._id.slice(0,5)}</td>
                        <td>{order.customer}</td>
                        <td>${order.total}</td>
                        <td>{order.method[0] === 1 ||  order.status[0]  === 2 ? 'Paid': 'Not Yet Paid'}</td>
                        <td>{orderStatus[order.status]}</td>
                        <td>
                           <button onClick={() => handleStatus(order._id)} className={styles.button} disabled={order.status[0] === 2 ? true : false}>
                           {order.status[0] === 2 ? "Completed" : "Next Stage"}</button>
                            <button className={styles.button}>Delete</button>
                        </td>
                    </tr>

                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {

    const myCookie = ctx.req?.cookies || ''
    let admin = false
    if(myCookie.token !== process.env.TOKEN){
        return{
            redirect:{
                destination:'/admin/login',
                permanent:false,
            }
        }
    } else {
        admin = true
    }
    
    return {
      props:{
        admin: admin
      }
    }
  }

  
export default Index




