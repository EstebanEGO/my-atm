import { useEffect, useState } from "react";
import { getTransactions } from "../utils/services";

interface TransactionProp {
    concept: string;
    amount: number;
    createdAt: string;
}

export const useTransaction = (id: string) => {
    const [transactions, setTransactions] = useState<TransactionProp[]>([]);

    useEffect(() => {
        getTransactions(id)
            .then(({ data }) => setTransactions(data))
            .catch((response) => console.log(response));
    }, []);

    return {
        transactions,
        setTransactions
    }
}
