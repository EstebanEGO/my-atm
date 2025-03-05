import { Button } from "../components/button";
import { useAtm } from "../hooks/useAtm";
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
    } = useAtm({
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
                <button className="text-end underline cursor-pointer" onClick={logOut}>Cerrar</button>
            </div>

            <div className="flex justify-center text-5xl py-5">
                <span>{currencyFormatter(customer.balance)}</span>

            </div>
            <div className="flex justify-center mb-3">
                <button
                    className="text-end underline cursor-pointer"
                    onClick={() => setAtmData(atm => ({ ...atm, showTransactions: true }))}>Movimientos</button>
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
                            [100, 200, 500, 1000].map((value) => (
                                <Button key={value} text={"$" + value} onClick={onChangeAmount} value={value} />
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
                        <button
                            className="underline cursor-pointer"
                            onClick={() => setAtmData(atm => ({ ...atm, showTransactions: false }))}>Ocultar</button>
                    </div>
                    <Transactions id={customer.id} />
                </div>
            }
        </div>
    )
}
