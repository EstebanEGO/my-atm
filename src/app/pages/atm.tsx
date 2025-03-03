import { Button } from "../components/button";
import { atmHook } from "../hooks/atmHook";
import { currencyFormatter } from "../utils/util";
import { Transactions } from "./transactions";

export const Atm = (props: { setIsAuth: any }) => {
    const {
        atmData,
        setAtmData,
        logOut,
        onClick,
        onChangeAmount,
        setAmountZero,
        sendTransaction
    } = atmHook({
        customer: {
            id: '',
            firstname: '',
            lastname: '',
            balance: 0
        },
        transaction: {
            amount: 0,
            concept: '',
            type: ''
        },
        showButtons: false,
        showTransactions: false
    }, props.setIsAuth);

    const { customer, transaction, showButtons, showTransactions } = atmData;
    return (
        <div className="pt-2">
            <div className="grid grid-cols-2 gap-4">
                <h3 className="text-fuchsia-700">Hola {customer.firstname} {customer.lastname}</h3>
                <a className="text-end underline cursor-pointer" onClick={logOut}>Cerrar</a>
            </div>

            <div className="flex justify-center text-5xl py-5">
                <span>{currencyFormatter(customer.balance)}</span>

            </div>
            <div className="flex justify-center mb-3">
                <a
                    className="text-end underline cursor-pointer"
                    onClick={() => setAtmData(atm => ({ ...atm, showTransactions: true }))}>Movimientos</a>
            </div>
            {
                !showButtons &&
                <div className="grid grid-cols-2 gap-4">
                    <Button text="Depositar" onClick={() => onClick('deposit')} />
                    <Button disabled={customer
                        .balance == 0
                    } text="Retirar" onClick={() => onClick('withdraw')} />
                </div>
            }

            {
                showButtons &&
                <div>
                    <hr />
                    <div className="mt-2 grid grid-cols-2 gap-4">
                        {
                            [100, 200, 500, 1000].map((value, index) => (
                                <Button key={index} text={"$" + value} onClick={onChangeAmount} value={value} />
                            ))
                        }
                        <label htmlFor="other">Otra cantidad</label>
                        <input placeholder="Ingresa otra cantidad" value={transaction.amount}
                            onChange={onChangeAmount}
                            className="disabled:bg-gray-300 border-2 p-1 rounded-md" type="number" name="other" />
                        <Button text="Confirmar" onClick={sendTransaction} />
                        <Button onClick={() => { setAtmData(atm => ({ ...atm, showButtons: false })); setAmountZero(); }} text="Cancelar" className="border-red-400 hover:bg-red-100" />
                    </div>
                </div>
            }
            {
                showTransactions &&
                <div className="mt-3">
                    <hr />
                    <div className="text-end">
                        <a
                            className="underline cursor-pointer"
                            onClick={() => setAtmData(atm => ({ ...atm, showTransactions: false }))}>Ocultar</a>
                    </div>
                    <Transactions id={customer.id} />
                </div>
            }
        </div>
    )
}
