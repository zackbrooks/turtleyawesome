import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import Add from '../components/Add'
import AddButton from '../components/AddButton'
import axios from 'axios'
import { useState } from 'react'


export default function Home({pizzaList, admin}) {
  const [close, setClose] = useState(true)
  return (
    <div>
      <Head>
        <title>Turtley Sauced</title>
        <meta name="description" content="Best Pizza in Northeast Arkansas" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      <Featured/>
      {admin && <AddButton setClose={setClose}/>}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <Add setClose={setClose}/>}
    </div>
  )
}
 export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || ''
    let admin = false
    if(myCookie.token === process.env.TOKEN){
        admin = true
    }
  const res = await axios.get('http://localhost:3000/api/products')
  return {
    props:{
      pizzaList: res.data,
      admin
    }
  }
 }