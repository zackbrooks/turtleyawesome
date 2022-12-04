import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home({ admin }) {
  const [close, setClose] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const productsData = await axios.get(
      `https://turtleyawesome.vercel.app/api/products`
    );
    // const productsData = await axios.get(`http://localhost:3000/api/products`)
    setProducts(productsData.data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <Head>
        <title>Turtley Sauced</title>
        <meta name="description" content="Best Pizza in Northeast Arkansas" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={products} />
    </div>
  );
}
