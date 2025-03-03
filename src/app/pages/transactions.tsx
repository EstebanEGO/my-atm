import { Card } from "../components/card";
import moment from "moment";
import { currencyFormatter } from "../utils/util";
import { transactionHook } from "../hooks/transactionHook";

export const Transactions = ({ id }: { id: string }) => {

  const { transactions } = transactionHook(id);

  return (
    <div>
      {
        transactions.map((transaction, index) => (
          <Card
            key={index}
            title={transaction.concept}
            amount={currencyFormatter(transaction.amount).toString()}
            date={moment(transaction.createdAt).format('MMMM Do YYYY, hh:mm:ss')} />
        ))
      }
    </div>
  )
}
