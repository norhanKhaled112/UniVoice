 function TextAbout() {
    return (
        <div className="text-about px-6 sm:px-10 md:ml-20 md:px-0 mt-8 sm:mt-12 md:mt-15 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--TextSecondary)]">
                About Us
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                <p className="text-base sm:text-lg font-semibold text-[var(--orange)] tracking-wide">
                    We are a Student Team Building UniVoice
                </p>
                <span className="text-xs sm:text-sm text-[var(--TextHeroSecondaryFirst)] font-semibold bg-[var(--bgHero)] px-2.5 py-1 rounded-full border border-[#d2b7e5]">
                    STUDENT-LED INITIATIVE
                </span>
            </div>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--Text)]">
                Your Campus. Your Voice. A platform created by students, for students, to
                make reporting campus issues and suggestions transparent, direct, and
                effective.
            </p>
        </div>
    );
  }
  export default TextAbout;