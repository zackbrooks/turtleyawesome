import styles from "../styles/PizzaCard.module.css"
import Image from "next/image"
import Link from 'next/link'

const PizzaCard = ({pizza}) => {
  const {_id:id, title, desc, img, prices} = pizza

  return (
    <Link href={`/product/${id}`}>
    <div className={styles.container}>
      <Image src={img} width='500' height='500'/>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.price}>${prices[0]}</span>
        <p className={styles.desc}>{desc}</p>
       
    </div>
    </Link>
  )
}

export default PizzaCard