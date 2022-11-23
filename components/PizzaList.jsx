import styles from "../styles/PizzaList.module.css"
import PizzaCard from "./PizzaCard"
const PizzaList = ({pizzaList}) => {
  const {products} = pizzaList

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
        <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae fugiat pariatur perspiciatis ex magni dolores doloribus hic quasi sed, quisquam nostrum quae nobis sint ipsum maxime assumenda ad blanditiis eius.
        </p>
        <div className={styles.wrapper}>
            {products.map((pizza,i) => (
            <PizzaCard key={`${pizza._id}`} pizza={pizza}/>
            ))}
        </div>
    </div>
  )
}

export default PizzaList