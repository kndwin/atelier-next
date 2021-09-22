import Button from "components/Common/Button";
import { modalVar, orderVar } from "graphql/reactiveVar";
import styles from "./styles.module.scss";
import Exclaimation from "public/svg/exclaimation.svg";
import Checkbox from "components/Common/Checkbox";

const Orders = (props) => {
  const { orderNo, product, image } = orderVar()[0];
  const {
    date,
    quantity,
    amount,
    paymentType,
    endingNum,
    carbonOffset,
    timeline,
    address,
    dateArrival,
  } = {
    date: "22 JUNE, 2020",
    quantity: "5,000",
    amount: "AUD 34,400",
    paymentType:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1920px-Mastercard_2019_logo.svg.png",
    endingNum: "004",
    carbonOffset: "0.05",
    timeline: [
      { title: "PRIMARY", days: "50 DAYS" },
      { title: "SECONDARY PACKAGING", days: "20 DAYS" },
      { title: "LABELLING", days: "20 DAYS" },
      { title: "FORMULATION & FILLING", days: "10 DAYS" },
    ],
    address: "808 George St\nSydney, NSW\nAustralia, 2000",
    dateArrival: Date.now(),
  };
  return (
    <div className={styles.ordersWrapper}>
      <p className={`${styles.h3} ${styles.ordersDetails}`}>Order Details</p>
      <p className={styles.h3}>#{orderNo.toString().padStart(5, "0")}</p>
      <div className={styles.stats}>
        <div>
          <p className={styles.title}>Product Details</p>
        </div>
        <div>
          <p className={styles.title}>Product Name</p>
          <p className={styles.text}>{product}</p>
        </div>
        <div>
          <p className={styles.title}>Date</p>
          <p className={styles.text}> {date}</p>
        </div>
        <div>
          <p className={styles.title}>Quantity</p>
          <p className={styles.text}>{quantity}</p>
        </div>
        <div>
          <p className={styles.title}>Amount</p>
          <p className={styles.text}>{amount}</p>
        </div>
      </div>
      <div className={styles.carbonOffset}>
        <img className={styles.image} src={image} alt="" />
        <div className={styles.boxWrapper}>
          <div className={styles.box}>
            <p className={styles.text}>
              You can carbon offset this order by adding {carbonOffset} AUD per
              unit. This offset is means that when the products arrive in your
              warehouse they are carbon neutral.
            </p>
            <div className={styles.stat}>
              <p className={styles.h1}>{carbonOffset}</p>
              <p className={styles.text}>AUD PER UNIT</p>
            </div>
          </div>
          <div className={styles.flex}>
            <Checkbox />
            <div className={styles.box}>
              <p className={styles.text}>
                CHECK HERE IF YOU WANT TO CARBON OFFSET YOUR PRODUCT
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.line} />
      <div className={styles.paymentStats}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.flex}>
              <p className={styles.textStat}>production timeline</p>
              <p className={styles.textStat}>60 days</p>
            </div>
          </div>
          {timeline.map(({ title, days }) => (
            <div className={styles.stat}>
              <div className={styles.flex}>
                <p className={styles.text}>{title}</p>
                <p className={styles.textStat}>{days}</p>
              </div>
              <div className={styles.progressLine} />
            </div>
          ))}
        </div>
        <div className={styles.payments}>
          <Exclaimation className={styles.exclaimation} />
          <div className={styles.flexCol}>
            <div className={styles.dateWrapper}>
              <div className={styles.flex}>
                <p className={styles.text}>
                  If you complete this order today.
                  <br />
                  your product will arrive in your
                  <br />
                </p>
                <p className={styles.h1}>{new Date(dateArrival).getDate()}</p>
              </div>
              <div className={styles.flex}>
                <p className={styles.textBold}>
                  {new Intl.DateTimeFormat("en", {
                    day: "2-digit",
                    month: "long",
                  }).format(dateArrival)}
                </p>
                <p className={styles.textBold}>
                  {new Intl.DateTimeFormat("en", { month: "long" }).format(
                    dateArrival
                  )}
                </p>
              </div>
            </div>
            <div className={styles.addressAndPayment}>
              <div>
                <p className={styles.textBold}>shipment</p>
                <p className={styles.text}>{address}</p>
              </div>
              <div>
                <p className={styles.textBold}>Payment method</p>
                <p className={styles.text}>Standard</p>
                <div className={styles.flex}>
                  <img className={styles.icon} src={paymentType} />
                  <p className={styles.text}>Ending: {endingNum}</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() =>
                modalVar({
                  ...modalVar(),
                  isOpen: true,
                  type: "ORDER_ADDRESS_EDIT",
                })
              }
              size="small"
              reversed
              width="100%"
              align="center"
            >
              EDIT
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.line} />
      <div className={styles.total}>
        <div className={styles.totalStats}>
          <div className={styles.flexCol}>
            <div className={styles.flex}>
              <Checkbox />
              <div className={styles.box}>
                <p className={styles.text}>50% DEPOSIT, 50% DELIVERY</p>
              </div>
            </div>
            <div className={styles.flex}>
              <Checkbox />
              <div className={styles.box}>
                <p className={styles.text}>PAY UPFRONT WITH A 5% DISCOUNT</p>
              </div>
            </div>
          </div>
          <div className={styles.paymentText}>
            <p className={styles.h1}>$1,750</p>
            <p className={styles.iip2}>SAVINGS PAYING UP FRONT</p>
          </div>
        </div>
        <Button
          onClick={() =>
            modalVar({
              ...modalVar(),
              isOpen: true,
              type: "COMPLETE_ORDER",
            })
          }
          reversed
          width="100%"
          size="small"
          align="center"
        >
          Complete order
        </Button>
      </div>
    </div>
  );
};

export default Orders;
