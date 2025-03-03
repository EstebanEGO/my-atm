import { Button } from '../components/button';
import { loginHook } from '../hooks/loginHook';

export const Login = ({ setIsAuth, setShowRegister }: { setIsAuth: any, setShowRegister: any }) => {
    const {
        loginData,
        onChange,
        onSubmit
    } = loginHook({
        form: {
            number: '',
            pin: ''
        },
        errors: {}
    }, setIsAuth);

    const { form, errors } = loginData;
    return (
        <div>
            <div>
                <label htmlFor="numer">Ingresa tu número de tarjeta:</label>
                <input
                    value={form.number}
                    onChange={onChange}
                    type="number" name="number" className="rounded-md w-full border-2 p-1.5 border-fuchsia-500 focus:outline-none" />
                {
                    errors.number &&
                    <small className='text-red-500'>{errors.number}</small>
                }
            </div>

            <div>
                <label htmlFor="pin">Ingresa tu pin:</label>
                <input
                    value={form.pin}
                    onChange={onChange}
                    type="number" name="pin" className="rounded-md w-full border-2 p-1.5 border-fuchsia-500 focus:outline-none" />
                {
                    errors.pin &&
                    <small className='text-red-500'>{errors.pin}</small>
                }
            </div>

            <Button
                className="w-full mt-3"
                text="Enviar"
                onClick={onSubmit} />
            <div className='mt-2 flex justify-center'>
                <h2>Ó</h2>
            </div>
            <Button
                className="w-full"
                text="Registrate"
                onClick={() => setShowRegister(true)} />
        </div>
    )
}
