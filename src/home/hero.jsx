import hero from "../assets/image/hero.svg";
import { faGraduationCap,faArrowRight,faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-between overflow-hidden bg-gradient-to-br from-[#f6f2ff] via-white to-[#eee6ff] px-6 py-12 lg:px-16">
          
            <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:w-[45%] lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full bg-[var(--bgHero)] px-4 py-1.5 text-xs font-medium text-[var(--TextHeroSecondaryFirst)] sm:text-sm">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span>University Complaint &amp; Suggestions Platform</span>
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-[var(--TextHero)] sm:text-6xl lg:text-7xl">
                    Welcome to
                </h2>

                <h1 className="bg-gradient-to-r from-[var(--TextHeroSecondaryFirst)] via-[var(--TextHeroSecondarySecond)] to-[var(--TextHeroSecondary)] bg-clip-text pb-2 text-5xl font-extrabold text-transparent sm:text-6xl lg:text-7xl">
                    UniVoice
                </h1>

                <p className="mt-3 text-base leading-relaxed text-[var(--Text)] sm:text-xl">
                    Speak up. Share your idea. <br className="hidden sm:block" />
                    Make your university better.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                    <Link
                        to="/login"
                        className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--TextHeroSecondarySecond)] bg-[var(--TextHeroSecondarySecond)] px-7 py-3 font-medium text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95 sm:w-auto"
                    >
                        <span>Get Started</span>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>

                    <Link
                        to="/about"
                        className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--TextHeroSecondarySecond)] px-7 py-3 font-medium text-[var(--TextHeroSecondarySecond)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-purple-50 active:scale-95 sm:w-auto"
                    >
                        <span>Learn More</span>
                        <FontAwesomeIcon
                            icon={faPlay}
                            className="text-xs transition-transform duration-300 group-hover:scale-110"
                        />
                    </Link>
                </div>
            </div>

          
            <div className="hidden lg:flex lg:w-[55%] lg:items-center lg:justify-end">
                <img
                    src={hero}
                    alt="Hero"
                    className="h-auto w-full object-contain"
                />
            </div>
        </div>
    );
}

export default Hero;