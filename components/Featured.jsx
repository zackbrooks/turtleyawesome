import Image from "next/image"
import { useState } from "react"
import styles from "../styles/Featured.module.css"

const Featured = () => {
    const [index, setIndex] = useState(0)
    const handleArrow = (str) =>{
        if(str === 'left'){
            index === 0 ? setIndex(2) : setIndex( index - 1)
        } else {
            index === 2 ? setIndex(0) : setIndex( index + 1)
        }
    }
    const images = [
        '/img/featured.webp',
        '/img/featured2.webp',
        '/img/featured3.jpg',
    ]
  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer} style={{left:0}} onClick={() => handleArrow('left')}>
             <Image src='/img/arrowl.png' alt="" layout="fill" objectFit="contain"/>
        </div>
        {/* <div className={styles.wrapper}>
                
                 <div className={styles.imgContainer} key={index}>
                    <Image src={images[index]}  alt="" layout="fill" objectFit="contain"/>
                 </div>
              
        </div> */}
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
                {images.map( (img, i) => (
                 <div className={styles.imgContainer} key={i}>
                    <Image src={img}  alt="" layout="fill" objectFit="contain"/>
                 </div>
                ))}
        </div>
        <div className={styles.arrowContainer} style={{right:0}} onClick={handleArrow}>
            <Image src='/img/arrowr.png' alt="" layout="fill" objectFit="contain"/>
        </div>
    </div>
  )
}

export default Featured