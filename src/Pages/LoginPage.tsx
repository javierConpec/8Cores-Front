import { IAuthLogin } from "../Interfaces/Auth";
import AuthForm from "../layouts/Form/AuthForm";

const Login = () => {
  const handleLogin = (data: IAuthLogin) => {
    console.log("Iniciando sesión con:", data.email, data.pass);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-100 dark:bg-background-100">
      <div className="flex w-[90%]   md:w-3/5 h-[450px] bg-background-0 dark:bg-background-200 shadow-lg rounded-lg overflow-hidden transform   animate-fadeIn">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 transition duration-500 ease-in-out">
          <h1 className="text-2xl  md:text-4xl text-center text-text-900 uppercase font-bold mb-10 md:mb-4">
            Bienvenido de nuevo
          </h1>
          <AuthForm type="login" onSubmit={handleLogin} />
        </div>

        <div className="hidden md:flex w-1/2 h-full bg-black text-white flex-col items-center justify-center p-8">
          <img src="/LogowiithEslogan.png" alt="Eslogan" className="w-4/4" />
        </div>
      </div>
    </div>
  );
};

export default Login;
