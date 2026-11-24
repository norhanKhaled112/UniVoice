import { Link, useNavigate } from 'react-router-dom';
import login from "../assets/image/login2.svg";
import { faArrowRight, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';


function Login() {
    const [Clicked, setClicked] = useState(false);

    function signup() {
        setClicked(true);
    }

    function backToLogin() {
        setClicked(false);
    }
    const [department, setDepartment] = useState("");

    const departments = [
        "Computer Science",
        "Engineering",
        "Business",
        "BIS",
    ];

    return (
        <div className="flex min-h-screen justify-between items-center h-screen w-full ">
            <div className='hidden lg:block lg:w-1/2'>
                <img src={login} alt="Login" className="w-full h-auto" />
            </div>
            <div className="m-auto flex w-full max-w-md flex-col items-center justify-center rounded-2xl bg-[var(--TextHeroSecondaryFirst)] px-6 py-8 sm:px-10 sm:py-10 lg:w-1/3 lg:max-w-none">
                <p className="text-center text-2xl font-bold text-white sm:text-3xl">
                    {Clicked ? "Create Account" : "Welcome Back"}
                </p>
                <p className="mt-2 text-center text-sm text-white/80 sm:text-lg">
                    Your campus. Your voice. Let's get started!
                </p>

                <div className={Clicked ? "hidden" : "w-full"}>
                    <form className="mt-6 flex w-full flex-col items-center">
                        <input
                            type="email"
                            placeholder="Email"
                            className="mb-4 h-12 w-full rounded-lg border border-[#adb5bd] bg-transparent px-4 text-white placeholder:text-white focus:border-white focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="mb-4 h-12 w-full rounded-lg border border-[#adb5bd] bg-transparent px-4 text-white placeholder:text-white focus:border-white focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="group mb-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white font-bold text-[var(--TextHeroSecondarySecond)] transition hover:bg-[#e1d8f7]"
                        >
                            <span>Login</span>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                        </button>
                        <p className="text-center text-sm text-white/80">
                            Don't have an account?
                            <button
                                type="button"
                                onClick={signup}
                                className="font-bold text-[#ff6d00] hover:underline"
                            >
                                &nbsp;Sign Up
                            </button>
                        </p>
                    </form>
                </div>

                <div className={Clicked ? "w-full" : "hidden"}>
                    <form className="mt-6 flex w-full flex-col items-center">
                        <input
                            type="text"
                            placeholder="Name"
                            className="mb-4 h-12 w-full rounded-lg border border-[#adb5bd] bg-transparent px-4 text-white placeholder:text-white focus:border-white focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder=" Uni ID"
                            className="mb-4 h-12 w-full rounded-lg border border-[#adb5bd] bg-transparent px-4 text-white placeholder:text-white focus:border-white focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="mb-4 h-12 w-full rounded-lg border border-[#adb5bd] bg-transparent px-4 text-white placeholder:text-white focus:border-white focus:outline-none"
                        />
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className="mb-4 h-12 w-full rounded-lg border border-[#adb5bd] bg-transparent px-4 text-white focus:border-white focus:outline-none"
                        >
                            <option value="" disabled className="bg-[#666377] text-white/70">
                                Select Department
                            </option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept} className="bg-[#666377] text-white">
                                    {dept}
                                </option>
                            ))}
                        </select>
                        <input
                            type="password"
                            placeholder="Password"
                            
                            className="mb-4 h-12 w-full rounded-lg border border-[#adb5bd] bg-transparent px-4 text-white placeholder:text-white focus:border-white focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="group mb-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white font-bold text-[var(--TextHeroSecondarySecond)] transition hover:bg-[#e1d8f7]"
                        >
                            <span>Sign Up</span>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                        </button>
                        <p className="text-center text-sm text-white/80">
                            Already have an account?
                            <button
                                type="button"
                                onClick={backToLogin}
                                className="font-bold text-[#ff6d00] hover:underline"
                            >
                                &nbsp;Login
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;