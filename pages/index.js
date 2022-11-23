import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Turtley Sauced</title>
        <meta name="description" content="Best Pizza in Northeast Arkansas" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      <Featured/>
      <PizzaList/>
    </div>
  )
}
