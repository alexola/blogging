import Link from 'next/link'
import styles from '../styles/BlogCard.module.css'


export function BlogCard({title, author, coverPhoto, datePublished, slug}) {
  return(
    <div className={styles.card}>
      <Link href={'/posts/' + slug} >
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} alt="" />
        </div>
      </Link>
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div classNme={styles.author}>
          <img src={author.avatar} alt={author.name} />
            <h3>{author.name}</h3>
          </div>
          <div className={styles.date} >
            <h3>{datePublished}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}


