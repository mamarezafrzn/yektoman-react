import styles from "./Card.module.css";

const Card = (props) => {

  return (
    <div className={styles.gridContainer}>
      <div className={styles.menuSlot}></div>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <div className={styles.headerTitle}>
          <h1 className={styles.heading}>{props.heading}</h1>
          <h4 className={styles.description}>{props.description}</h4>
          </div>
        {props.showBtn=="true" && <button onClick={props.modalClickHandler} className={styles.headerBtn}>ثبت پرداخت جدید</button>}

        </div>
        <div className={styles.cardBody}>{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
