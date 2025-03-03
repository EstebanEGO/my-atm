'use client'
import { Atm } from "./pages/atm";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { homeHook } from "./hooks/homeHook";

export default function Home() {

  const {
    showRegister,
    isAuth,
    setShowRegister,
    setIsAuth
  } = homeHook();

  return (
    <div className="container mx-auto px-4 py-4">
      <main className="border-gray-300 mx-auto max-w-md rounded-xl shadow-md border-2 p-4">
        <h1 className="mb-2 font-bold">Bienvenid@ ATM</h1>

        {
          !isAuth && !showRegister &&
          <Login setIsAuth={setIsAuth} setShowRegister={setShowRegister} />
        }

        {
          !isAuth && showRegister &&
          <Register setShowRegister={setShowRegister} />
        }

        {
          isAuth &&
          <Atm setIsAuth={setIsAuth} />
        }
      </main>
    </div>
  );
}
