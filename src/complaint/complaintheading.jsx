function ComplaintHeading() {
    return (
        <div className="mx-auto mt-8 sm:mt-10 w-full max-w-7xl px-4 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-[var(--bgHero)] px-4 py-1.5 text-xs font-medium text-[var(--TextHeroSecondaryFirst)] sm:text-sm">
                    Submit a Complaint / Suggestion
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--TextHero)] sm:text-4xl lg:text-5xl">
                    File a Complaint
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-[var(--Text)] sm:text-base lg:text-lg">
                    Let us know your concerns or issues. Your feedback helps make campus life better for everyone.
                </p>
            </div>
        </div>
    );
}

export default ComplaintHeading;