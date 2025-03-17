import { Link, useNavigate } from "react-router-dom";

const Launcher = () => {

    const navigate = useNavigate();

    return (
        <div>
            <header></header>
            <main className="flex h-200">
                <div className="flex-3 flex flex-col justify-center items-center gap-10">
                    <h1 class="text-5xl font-bold">Welcome to Pedition</h1>
                    <img src="../../public/dog-icon.jpg" alt="dog logo" class="w-50 object-cover"/>
                </div>
                
                <div className="flex-2 flex flex-col justify-center items-center gap-8">
                    <div className="bg-red-300 hover:bg-pink-200 flex flex-col gap-4 px-6 py-4 mx-6 rounded-2xl">
                        <h2 class="text-2xl font-semibold px-5">To access, first create a account an then, login in your account.</h2>
                        <div className="flex justify-center gap-8">
                            <button className="bg-red-400 text-white px-5 py-3 rounded-lg hover:bg-pink-400 transition cursor-pointer" onClick={() => navigate('/register')}>Register</button>
                            <button className="bg-red-400 text-white px-5 py-3 rounded-lg hover:bg-pink-400 transition cursor-pointer" onClick={() => navigate('/login')}>Login</button>
                        </div>
                    </div>

                    <div className="bg-red-300 hover:bg-pink-200 flex flex-col justify-center items-center px-6 py-4 gap-3 mx-6 rounded-2xl">
                        <h3 class="text-2xl font-semibold">Demo Account</h3>
                        <p>You can use it without register, but only you'll see like expector, if you wanna interact, please create a account</p>
                        <div className="flex justify-center">
                            <button className="bg-red-400 text-white rounded-lg px-5 py-3 hover:bg-pink-400 transition cursor-pointer" onClick={() => navigate('/home')}>Demo Account</button>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="bg-gray-100 h-27.5 flex justify-center items-center gap-12">
                <a class="text-xs hover:text-sm transition cursor-pointer">Polity and terms</a>
                <a class="text-xs hover:text-sm transition cursor-pointer">Sponsored</a>
                <a class="text-xs hover:text-sm transition cursor-pointer">Collaborations</a>
                <a class="text-xs hover:text-sm transition cursor-pointer">Contact</a>
            </footer>
        </div>
    )
}

export default Launcher;