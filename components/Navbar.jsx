import Image from "next/image"
import styles from "../styles/Navbar.module.css"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src='/img/telephone.png' width={32} height={32}/>
        </div>
        <div className={styles.texts}>
            <div className={styles.text}>ORDER NOW!</div>
            <div className={styles.text}>870 278 0155</div>
        </div>
        </div>
        <div className={styles.item}>
            <ul className={styles.list}>
                <Link href='/'><li className={styles.listItem}>Homepage</li></Link>
                <li className={styles.listItem}>Products</li>
                <li className={styles.listItem}>Menu</li>
                <Image src='/img/apple-touch-icon.png' width={100} height={100}/>
                <li className={styles.listItem}>Events</li>
                <li className={styles.listItem}>Blog</li>
                <li className={styles.listItem}>Contact</li>
            </ul>
        </div>
        <div className={styles.item}>
            <div className={styles.cart}>
            <Image src='/img/cart.png' width={30} height={30}/>
            <div className={styles.counter}>2</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar