import { useNavigate } from "react-router-dom";
import login from "../assets/image/login2.svg";
import {
    faArrowRight,
    faUserGraduate,
    faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

// بيانات تجريبية تحاكي الداتا بيز (هتتبدل بالـ API لما تربطي الباك إند)
const MOCK_DATABASE_USERS = [
    {
        name: "Norhan Khaled",
        uniId: "20230418",
        email: "student@univoice.edu",
        password: "123",
        role: "Student",
    },
    {
        name: "Dr. Ahmed Hassan",
        uniId: "STF-104",
        email: "staff@univoice.edu",
        password: "123",
        role: "Staff",
    },
];

function Login() {
    const navigate = useNavigate();
    const [role, setRole] = useState("Student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setError("");

        const storedUsers = JSON.parse(
            localStorage.getItem("univoice_users") || "[]"
        );
        const allUsers = [...MOCK_DATABASE_USERS, ...storedUsers];

        const matchedUser = allUsers.find(
            (u) =>
                u.role.toLowerCase() === role.toLowerCase() &&
                u.email.toLowerCase() === email.trim().toLowerCase() &&
                u.password === password
        );

        if (!matchedUser) {
            setError(
                `Invalid ${role.toLowerCase()} email or password. Please check your credentials.`
            );
            return;
        }

        const { password: _, ...safeUserData } = matchedUser;
        localStorage.setItem("univoice_user", JSON.stringify(safeUserData));

        if (safeUserData.role.toLowerCase() === "staff") {
            navigate("/staff-dashboard");
        } else {
            navigate("/profile");
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-between py-6">
            <div className="hidden lg:block lg:w-1/2">
                <img src={login} alt="Login" className="h-auto w-full" />
            </div>

            <div className="m-auto flex w-full max-w-md flex-col items-center justify-center rounded-2xl bg-[var(--TextHeroSecondaryFirst)] px-6 py-8 sm:px-10 sm:py-10 lg:w-1/3 lg:max-w-none">
                <p className="text-center text-2xl font-bold text-white sm:text-3xl">
                    Welcome Back
                </p>
                <p className="mt-2 text-center text-sm text-white/80 sm:text-lg">
                    Your campus. Your voice. Sign in with your university account.
                </p>

                <form
                    onSubmit={handleLoginSubmit}
                    className="mt-6 flex w-full flex-col items-center"
                >
                  
                    <div className="mb-5 grid w-full grid-cols-2 gap-2 rounded-xl bg-white/15 p-1.5">
                        <button
                            type="button"
                            onClick={() => {
                                setRole("Student");
                                setError("");
                            }}
                            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer ${role === "Student"
                                    ? "bg-white text-[var(--TextHeroSecondarySecond)] shadow-sm"
                                    : "text-white/85 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <FontAwesomeIcon icon={faUserGraduate} />
                            <span>Student</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setRole("Staff");
                                setError("");
                            }}
                            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer ${role === "Staff"
                                    ? "bg-white text-[var(--TextHeroSecondarySecond)] shadow-sm"
                                    : "text-white/85 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <FontAwesomeIcon icon={faUserTie} />
                            <span>Staff</span>
                        </button>
                    </div>

                    {error && (
                        <p className="mb-4 w-full rounded-lg border border-red-300/40 bg-red-500/20 px-3 py-2 text-center text-xs text-white">
                            {error}
                        </p>
                    )}

                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={
                            role === "Staff"
                                ? "Staff University Email"
                                : "Student University Email"
                        }
                        required
                        className="mb-4 h-12 w-full rounded-lg border border-[#adb5bd] bg-transparent px-4 text-white placeholder:text-white/80 focus:border-white focus:outline-none"
                    />
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="mb-6 h-12 w-full rounded-lg border border-[#adb5bd] bg-transparent px-4 text-white placeholder:text-white/80 focus:border-white focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="group mb-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white font-bold text-[var(--TextHeroSecondarySecond)] transition hover:bg-[#e1d8f7] cursor-pointer"
                    >
                        <span>Login as {role}</span>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                    </button>

                    <p className="text-center text-xs text-white/75">
                        Accounts are provided by the university administration.
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;