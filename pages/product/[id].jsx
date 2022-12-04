import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza2 }) => {
  const [pizza, setPizza] = useState({});
  const { _id: id, title, desc, img, prices, extraOptions } = pizza;
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const getProducts = async () => {
    const productsData = await axios.get(
      `https://turtleyawesome.vercel.app/api/products/${params.id}`
    );
    console.log("params.id", params.id);
    // const productsData = await axios.get(`http://localhost:3000/api/products`)
    console.log("productsData", productsData.data);
    setPizza(productsData.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
    console.log(extras);
  };

  const handleChange = (e, option) => {
    let checked = e.currentTarget.checked;
    checked ? changePrice(option.price) : changePrice(-option.price);
    checked
      ? setExtras((extras) => [...extras, option.text])
      : setExtras(extras.filter((extra) => extra !== option.text));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(Number(e.target.value))}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button
            className={styles.button}
            onClick={() =>
              dispatch(addProduct({ ...pizza, extras, price, quantity }))
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `https://turtleyawesome.vercel.app/api/products/${params.id}`
  );
  // const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)
  return {
    props: {
      pizza2: res.data,
    },
  };
};

export default Product;
