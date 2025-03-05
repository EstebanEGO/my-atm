import { Card } from "../components/card";
import moment from "moment";
import { currencyFormatter } from "../utils/util";
import { useTransaction } from "../hooks/useTransaction";

export const Transactions = ({ id }: { id: string }) => {

  const { transactions } = useTransaction(id);

  return (
    <div>
      {
        transactions.map((transaction) => (
          <Card
            key={transaction.createdAt}
            title={transaction.concept}
            amount={currencyFormatter(transaction.amount).toString()}
            date={moment(transaction.createdAt).format('MMMM Do YYYY, hh:mm:ss')} />
        ))
      }
    </div>
  )
}
