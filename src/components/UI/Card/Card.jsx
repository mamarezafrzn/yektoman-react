import styled from "styled-components";
import styles from "./Card.module.css";

const Card = (props) => {
 const CardContainer = styled.div`
    margin-top: 50px;
    width: 78%;
    min-height: 200px;
    @media (max-width: 950px) {
    
        display: block;
        margin: 0px auto;
        width: 95%;
      
    }

    ${props.containerStyle}
  `;

  return (


    <CardContainer>
      <div className={styles.cardHeader}>
        <div className={styles.headerTitle}>
          <h1 className={styles.heading}>{props.heading}</h1>
          <h4 className={styles.description}>{props.description}</h4>
        </div>
        {props.showBtn == "true" && (
          <button
            onClick={props.modalClickHandler}
            className={styles.headerBtn}
          >
            ثبت پرداخت جدید
          </button>
        )}
      </div>
      <div className={styles.cardBody}>{props.children}</div>
    </CardContainer>

  );
};

export default Card;
