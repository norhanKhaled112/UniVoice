import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [myComplaints, setMyComplaints] = useState([]);

    const loadStudentData = () => {
        const savedUser = JSON.parse(localStorage.getItem("univoice_user"));
        if (!savedUser || savedUser.role?.toLowerCase() !== "student") {
            navigate("/login");
            return;
        }
        setUser(savedUser);

        const allComplaints =
            JSON.parse(localStorage.getItem("univoice_complaints")) || [];

        const studentComplaints = allComplaints.filter(
            (item) =>
                item.studentEmail?.toLowerCase().trim() ===
                savedUser.email?.toLowerCase().trim()
        );
        setMyComplaints(studentComplaints);
    };

    useEffect(() => {
        loadStudentData();

        // Also update automatically if staff replies in another browser tab
        const handleStorageSync = (e) => {
            if (e.key === "univoice_complaints") {
                loadStudentData();
            }
        };
        window.addEventListener("storage", handleStorageSync);
        return () => window.removeEventListener("storage", handleStorageSync);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("univoice_user");
        navigate("/login");
    };

    if (!user) return null;

    const getStatusBadge = (status) => {
        if (status === "Resolved") {
            return "bg-green-100 text-green-700 border-green-300";
        }
        if (status === "In Progress") {
            return "bg-[var(--orange)]/15 text-[var(--orange)] border-[var(--orange)]/35";
        }
        return "bg-red-100 text-red-700 border-red-300";
    };

    return (
        <div className="min-h-screen bg-[#f8f7fc] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-6">
                {/* Student Profile Header Card */}
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--TextHeroSecondaryFirst)]/20 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--TextHeroSecondaryFirst)] text-xl font-bold text-white">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[var(--TextHero)] sm:text-2xl">
                                {user.name}
                            </h1>
                            <p className="text-sm text-[var(--Text)]">{user.email}</p>
                            <span className="mt-1 inline-block rounded-full bg-[var(--bgHero)] px-2.5 py-0.5 text-xs font-semibold text-[var(--TextHeroSecondaryFirst)]">
                                Student Account {user.uniId ? `• ID: ${user.uniId}` : ""}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/complaint")}
                            className="cursor-pointer rounded-xl bg-[var(--TextHeroSecondaryFirst)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--TextHeroSecondarySecond)]"
                        >
                            + New Complaint
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="cursor-pointer rounded-xl border border-[var(--TextHeroSecondaryFirst)]/30 px-4 py-2.5 text-sm font-semibold text-[var(--TextHeroSecondarySecond)] transition hover:bg-[var(--bgHero)]"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-[var(--TextHeroSecondaryFirst)]/15 bg-white p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-[var(--TextHero)]">
                            {myComplaints.length}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[var(--Text)] sm:text-sm">
                            Total
                        </p>
                    </div>
                    <div className="rounded-xl border border-red-200 bg-white p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-red-600">
                            {myComplaints.filter((c) => c.status === "Pending").length}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[var(--Text)] sm:text-sm">
                            Pending
                        </p>
                    </div>
                    <div className="rounded-xl border border-green-200 bg-white p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-green-600">
                            {myComplaints.filter((c) => c.status === "Resolved").length}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[var(--Text)] sm:text-sm">
                            Resolved
                        </p>
                    </div>
                </div>

                {/* Complaints History & Administration Replies */}
                <div className="rounded-2xl border border-[var(--TextHeroSecondaryFirst)]/20 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="mb-5 text-lg font-bold text-[var(--TextHero)] sm:text-xl">
                        My Complaints
                    </h2>

                    {myComplaints.length === 0 ? (
                        <div className="py-10 text-center">
                            <p className="mb-4 text-sm text-[var(--Text)]">
                                You haven&apos;t submitted any complaints yet.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate("/complaint")}
                                className="cursor-pointer rounded-xl bg-[var(--TextHeroSecondaryFirst)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--TextHeroSecondarySecond)]"
                            >
                                Submit Your First Complaint
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {myComplaints.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-xl border border-[var(--TextHeroSecondaryFirst)]/20 p-5 transition hover:border-[var(--TextHeroSecondaryFirst)]/40"
                                >
                                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                                        <div>
                                            <span className="rounded-md bg-[var(--bgHero)] px-2.5 py-0.5 text-xs font-semibold text-[var(--TextHeroSecondarySecond)]">
                                                {item.category}
                                            </span>
                                            <h3 className="mt-2 text-base font-bold text-[var(--TextMain)] sm:text-lg">
                                                {item.subject}
                                            </h3>
                                            <p className="mt-0.5 text-xs text-[var(--Text)]">
                                                Submitted on {item.date}
                                                {item.file ? ` • Attachment: ${item.file}` : ""}
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(
                                                item.status
                                            )}`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>

                                    <p className="mt-3 mb-4 text-sm leading-relaxed text-[var(--TextMain)]">
                                        {item.description}
                                    </p>

                                    {/* Administration Reply Box */}
                                    <div
                                        className={`rounded-xl border p-4 text-sm ${item.reply
                                                ? "border-[var(--TextHeroSecondaryFirst)]/30 bg-[var(--bgHero)] text-[var(--TextMain)]"
                                                : "border-gray-200 bg-gray-50 text-[var(--Text)]"
                                            }`}
                                    >
                                        <p className="mb-1 font-semibold text-[var(--TextHeroSecondarySecond)]">
                                            Administration Response{" "}
                                            {item.repliedBy ? `(by ${item.repliedBy})` : ""}:
                                        </p>
                                        {item.reply ? (
                                            <p className="leading-relaxed">{item.reply}</p>
                                        ) : (
                                            <p className="italic">
                                                No reply yet. Your complaint is under review by the administration.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;