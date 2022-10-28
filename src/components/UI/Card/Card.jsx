import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.menuSlot}></div>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <h1 className={styles.heading}>{props.heading}</h1>
          <h4 className={styles.description}>{props.description}</h4>
        </div>
        <div className={styles.cardBody}>{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
