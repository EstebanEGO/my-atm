import { useEffect, useState } from "react";
import { getUser, removeSessions, setUser } from "../utils/session";
import { showAlert } from "../utils/showAlerts";
import { saveTransaction } from "../utils/services";

interface Customer {
    id: string,
    firstname: string,
    lastname: string,
    balance: number
}
interface Transaction {
    amount: number;
    concept: string;
    type: string;
}
interface Props {
    customer: Customer;
    transaction: Transaction;
    showButtons: boolean;
    showTransactions: boolean;
}
export const useAtm = (props: Props, setIsAuth: any) => {

    const [atmData, setAtmData] = useState(props);
    useEffect(() => setAtmData(atm => ({ ...atm, customer: getUser() })), []);
    function logOut() {
        removeSessions();
        setIsAuth(false);
    }

    function onClick(type: string) {
        setAtmData(atm => ({ ...atm, showButtons: true, showTransactions: false, transaction: { ...atm.transaction, type, concept: (type == 'deposit' ? 'Deposito de efectivo' : 'Retiro de efectivo') } }));
    }

    function onChangeAmount(e: any) {
        const value = e.target.value;
        setAtmData(atm => ({ ...atm, transaction: { ...atm.transaction, amount: (value != '' ? parseInt(value) : 0) } }));
    }

    function setAmountZero() {
        setAtmData(atm => ({ ...atm, transaction: { ...atm.transaction, amount: 0 } }));
    }

    function sendTransaction() {
        const { transaction, customer } = atmData;
        let { type, amount } = transaction;
        let { balance } = customer;
        if (amount > 0) {
            if (type !== 'deposit') {
                amount = amount * -1;
            }
            if (balance + amount >= 0) {
                saveTransaction(customer.id, { ...transaction, amount }).then(({ data }) => {
                    if (data) {
                        let { balance } = customer;
                        balance += amount;
                        setUser({ ...customer, balance });
                        setAtmData(atm => ({ ...atm, showButtons: false, customer: { ...atm.customer, balance }, transaction: { ...atm.transaction, amount: 0 } }));
                    }
                }).catch((response) => {
                    console.log(response)
                });
            } else {
                showAlert({ title: 'Advertencia', text: 'Saldo insuficiente', icon: 'warning' }, setAmountZero);
            }
        } else {
            showAlert({ title: 'Advertencia', text: 'Agregar una cantidad mayor a cero', icon: 'warning' }, setAmountZero);
        }
    }

    return {
        atmData,
        setAtmData,
        logOut,
        onClick,
        onChangeAmount,
        setAmountZero,
        sendTransaction
    };
}
