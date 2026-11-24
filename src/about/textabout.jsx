 function TextAbout() {
    return (
        <div className="text-about ml-20 mt-15">
        <h1 className="text-4xl font-bold  text-[var(--TextSecondary)]">About Us</h1>
            <p className="text-lg font-semibold mt-1 text-[var(--orange)] tracking-wide inline-block">We are a Student Team Building UniVoice</p>
            <span className="text-sm ml-3 text-[var(--TextHeroSecondaryFirst)] font-semibold bg-[var(--bgHero)] px-2 py-1 rounded-full border-1 border-[#d2b7e5] ">STUDENT-LED INITIATIVE</span>
            <p className=" mt-3 text-[var(--Text)]">
                Your Campus. Your Voice. A platform created by students, for students,
                to make <br/>
                reporting campus issues and suggestions transparent, direct, and effective.
                </p>
        </div>
    );
  }
  export default TextAbout;