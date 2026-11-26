import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardStaff() {
    const navigate = useNavigate();

    const [staffUser, setStaffUser] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [replies, setReplies] = useState({});
    const [statusFilter, setStatusFilter] = useState("All");
    const [savedNoticeId, setSavedNoticeId] = useState(null);

    useEffect(() => {
       
        const savedUser = JSON.parse(localStorage.getItem("univoice_user"));
        if (!savedUser || savedUser.role?.toLowerCase() !== "staff") {
            navigate("/login");
            return;
        }
        setStaffUser(savedUser);

        
        const allComplaints =
            JSON.parse(localStorage.getItem("univoice_complaints")) || [];
        setComplaints(allComplaints);

        // Pre-fill reply inputs with any existing replies
        const initialReplies = {};
        allComplaints.forEach((c) => {
            initialReplies[c.id] = c.reply || "";
        });
        setReplies(initialReplies);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("univoice_user");
        navigate("/login");
    };

   
    const handleStatusChange = (id, newStatus) => {
        const updated = complaints.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
        );
        setComplaints(updated);
        localStorage.setItem("univoice_complaints", JSON.stringify(updated));
    };


    const handleSendReply = (id) => {
        const replyText = (replies[id] || "").trim();
        if (!replyText) return;

        const updated = complaints.map((item) =>
            item.id === id
                ? {
                    ...item,
                    reply: replyText,
                    repliedBy: staffUser.name,
                    status: item.status === "Pending" ? "In Progress" : item.status,
                }
                : item
        );

        setComplaints(updated);
        localStorage.setItem("univoice_complaints", JSON.stringify(updated));

        setSavedNoticeId(id);
        setTimeout(() => setSavedNoticeId(null), 2500);
    };

    if (!staffUser) return null;

    const filteredComplaints =
        statusFilter === "All"
            ? complaints
            : complaints.filter((c) => c.status === statusFilter);

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
            <div className="mx-auto max-w-5xl space-y-6">
                {/* Staff Header Card */}
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--TextHeroSecondaryFirst)]/20 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <span className="mb-2 inline-block rounded-full bg-[var(--bgHero)] px-3 py-1 text-xs font-semibold text-[var(--TextHeroSecondaryFirst)]">
                            Administration Portal
                        </span>
                        <h1 className="text-2xl font-bold text-[var(--TextHero)] sm:text-3xl">
                            Staff Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-[var(--Text)]">
                            Logged in as{" "}
                            <span className="font-semibold text-[var(--TextMain)]">
                                {staffUser.name}
                            </span>{" "}
                            ({staffUser.email})
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="cursor-pointer self-start rounded-xl border border-[var(--TextHeroSecondaryFirst)]/30 px-4 py-2.5 text-sm font-semibold text-[var(--TextHeroSecondarySecond)] transition hover:bg-[var(--bgHero)] sm:self-auto"
                    >
                        Logout
                    </button>
                </div>

           
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-xl border border-[var(--TextHeroSecondaryFirst)]/15 bg-white p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-[var(--TextHero)]">
                            {complaints.length}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[var(--Text)] sm:text-sm">
                            All Complaints
                        </p>
                    </div>
                    <div className="rounded-xl border border-red-200 bg-white p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-red-600">
                            {complaints.filter((c) => c.status === "Pending").length}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[var(--Text)] sm:text-sm">
                            Pending
                        </p>
                    </div>
                    <div className="rounded-xl border border-[var(--orange)]/30 bg-white p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-[var(--orange)]">
                            {complaints.filter((c) => c.status === "In Progress").length}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[var(--Text)] sm:text-sm">
                            In Progress
                        </p>
                    </div>
                    <div className="rounded-xl border border-green-200 bg-white p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-green-600">
                            {complaints.filter((c) => c.status === "Resolved").length}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[var(--Text)] sm:text-sm">
                            Resolved
                        </p>
                    </div>
                </div>

              
                <div className="flex flex-wrap gap-2">
                    {["All", "Pending", "In Progress", "Resolved"].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setStatusFilter(tab)}
                            className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${statusFilter === tab
                                    ? "bg-[var(--TextHeroSecondaryFirst)] text-white shadow-sm"
                                    : "border border-[var(--TextHeroSecondaryFirst)]/20 bg-white text-[var(--TextMain)] hover:bg-[var(--bgHero)]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

               
                {filteredComplaints.length === 0 ? (
                    <div className="rounded-2xl border border-[var(--TextHeroSecondaryFirst)]/15 bg-white p-10 text-center text-sm text-[var(--Text)]">
                        No complaints found in this category.
                    </div>
                ) : (
                    <div className="space-y-5">
                        {filteredComplaints.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-[var(--TextHeroSecondaryFirst)]/20 bg-white p-6 shadow-sm"
                            >
                             
                                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                    <div>
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <span className="rounded-md bg-[var(--bgHero)] px-2.5 py-0.5 text-xs font-semibold text-[var(--TextHeroSecondarySecond)]">
                                                {item.category}
                                            </span>
                                            <span
                                                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                                                    item.status
                                                )}`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>

                                        <h2 className="text-lg font-bold text-[var(--TextMain)]">
                                            {item.subject}
                                        </h2>
                                        <p className="mt-1 text-xs text-[var(--Text)] sm:text-sm">
                                            From{" "}
                                            <span className="font-semibold text-[var(--TextHero)]">
                                                {item.studentName}
                                            </span>{" "}
                                            ({item.studentEmail}) • {item.date}
                                        </p>
                                    </div>

                                   
                                    <div className="flex shrink-0 items-center gap-2">
                                        <label
                                            htmlFor={`status-${item.id}`}
                                            className="text-xs font-medium text-[var(--Text)]"
                                        >
                                            Status:
                                        </label>
                                        <select
                                            id={`status-${item.id}`}
                                            value={item.status}
                                            onChange={(e) =>
                                                handleStatusChange(item.id, e.target.value)
                                            }
                                            className="cursor-pointer rounded-xl border border-[var(--TextHeroSecondaryFirst)]/30 bg-white px-3 py-2 text-sm font-semibold text-[var(--TextMain)] focus:border-[var(--TextHeroSecondaryFirst)] focus:outline-none"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                        </select>
                                    </div>
                                </div>

                            
                                <p className="mb-4 text-sm leading-relaxed text-[var(--TextMain)]">
                                    {item.description}
                                </p>

                                {item.file && (
                                    <p className="mb-4 inline-block rounded-lg border border-[var(--TextHeroSecondaryFirst)]/20 bg-[var(--bgHero)]/50 px-3 py-2 text-xs text-[var(--Text)]">
                                        Attachment:{" "}
                                        <span className="font-semibold text-[var(--TextMain)]">
                                            {item.file}
                                        </span>
                                    </p>
                                )}

                              
                                {item.reply && (
                                    <div className="mb-4 rounded-xl border border-[var(--TextHeroSecondaryFirst)]/25 bg-[var(--bgHero)] p-4 text-sm text-[var(--TextMain)]">
                                        <p className="mb-1 font-semibold text-[var(--TextHeroSecondarySecond)]">
                                            Sent Reply{" "}
                                            {item.repliedBy ? `(by ${item.repliedBy})` : ""}:
                                        </p>
                                        <p>{item.reply}</p>
                                    </div>
                                )}

                             
                                <div className="border-t border-[var(--TextHeroSecondaryFirst)]/15 pt-3">
                                    <label
                                        htmlFor={`reply-${item.id}`}
                                        className="mb-2 block text-xs font-semibold text-[var(--TextHero)]"
                                    >
                                        Reply to Student
                                    </label>
                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <textarea
                                            id={`reply-${item.id}`}
                                            rows="2"
                                            value={replies[item.id] ?? ""}
                                            onChange={(e) =>
                                                setReplies({
                                                    ...replies,
                                                    [item.id]: e.target.value,
                                                })
                                            }
                                            placeholder="Write your official response to the student..."
                                            className="flex-1 resize-none rounded-xl border border-[var(--TextHeroSecondaryFirst)]/30 px-4 py-2.5 text-sm text-[var(--TextMain)] placeholder:text-[var(--Text)]/60 focus:border-[var(--TextHeroSecondaryFirst)] focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleSendReply(item.id)}
                                            className="shrink-0 cursor-pointer self-end rounded-xl bg-[var(--TextHeroSecondaryFirst)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--TextHeroSecondarySecond)] sm:self-stretch"
                                        >
                                            {item.reply ? "Update Reply" : "Send Reply"}
                                        </button>
                                    </div>

                                    {savedNoticeId === item.id && (
                                        <p className="mt-2 text-xs font-semibold text-green-600">
                                            Reply saved and delivered to the student&apos;s profile.
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardStaff;