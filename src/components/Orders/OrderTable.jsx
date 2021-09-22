import { useReactiveVar } from "@apollo/client";
import Status from "components/Common/Status";
import Table, {Row, Header, Cell} from "components/Common/Table";
import { drawerMessageVar, modalVar, orderVar } from "graphql/reactiveVar";
import styles from "./styles.module.scss";

const OrderTable = (props) => {
	const { withDelete } = props
  const orders = useReactiveVar(orderVar);
  const color = {
    PENDING: "orange",
    COMPLETE: "blue",
    IN_PRODUCTION: "green",
  };
  return (
    <div className={styles.orders}>
      <Table>
        <Header shadow>
          <Cell h6>Date</Cell>
          <Cell h6>Product</Cell>
          <Cell h6>Amount</Cell>
          <Cell h6 span={2}>Status</Cell>
        </Header>
        {orders.map(({ orderNo, date, product, amount, status }) => (
          <Row shadow>
            <Cell>{new Date(date).toLocaleString().split(",")[0]}</Cell>
            <Cell bold>{product}</Cell>
            <Cell bold>$ {amount.toLocaleString()}</Cell>
            <Cell span={2}>
              <Status color={color[status]} width="90%" align="center">
                {status.replace("_", " ")}
              </Status>
							<a onClick={() => modalVar({...modalVar(), isOpen: true, type: 'DELETE_ORDER'})} className={styles.delete}>
								Delete
							</a>
            </Cell>
          </Row>
        ))}
      </Table>
    </div>
  );
};

export default OrderTable;
