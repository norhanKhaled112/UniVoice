import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserShield,
    faPaperPlane,
    faClock,
    faCircleCheck,
    faSpinner,
    faFolderOpen,
    faArrowRightFromBracket,
    faReply,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

 function DashboardStaff() {
    const navigate = useNavigate();

    const staffUser = JSON.parse(
        localStorage.getItem("univoice_user") || "null"
    );

    const [allComplaints, setAllComplaints] = useState(() =>
        JSON.parse(localStorage.getItem("univoice_complaints") || "[]")
    );
    const [filterStatus, setFilterStatus] = useState("All");
    const [replyDrafts, setReplyDrafts] = useState({}); // لتخزين الردود المؤقتة لكل شكوى

    // لو حد فتح الصفحة ومش ستاف يرجعه للوج إن
    if (!staffUser || staffUser.role !== "Staff") {
        navigate("/login");
        return null;
    }

    // فلترة الشكاوى عشان يوصله شكاوى قسمه بس
    const departmentComplaints = allComplaints.filter(
        (c) =>
            c.department?.toLowerCase() === staffUser.department?.toLowerCase()
    );

    const filteredComplaints =
        filterStatus === "All"
            ? departmentComplaints
            : departmentComplaints.filter(
                (c) => (c.status || "Pending").toLowerCase() === filterStatus.toLowerCase()
            );

    // تحديث حالة الشكوى
    const handleStatusChange = (id, newStatus) => {
        const updated = allComplaints.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
        );
        setAllComplaints(updated);
        localStorage.setItem("univoice_complaints", JSON.stringify(updated));
    };

    // حفظ الرد على الشكوى
    const handleSendReply = (e, id) => {
        e.preventDefault();
        const replyText = (replyDrafts[id] || "").trim();
        if (!replyText) return;

        const updated = allComplaints.map((item) =>
            item.id === id
                ? {
                    ...item,
                    staffReply: replyText,
                    repliedBy: staffUser.name,
                    replyDate: new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    }),
                    // لو لسه Pending يخليها In Review أوتوماتيك بعد الرد
                    status: item.status === "Pending" ? "In Review" : item.status,
                }
                : item
        );

        setAllComplaints(updated);
        localStorage.setItem("univoice_complaints", JSON.stringify(updated));
        setReplyDrafts((prev) => ({ ...prev, [id]: "" }));
    };

    const handleLogout = () => {
        localStorage.removeItem("univoice_user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8F7FC] to-[#F3F0FA] px-4 py-8 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-6xl space-y-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#ECE8F6] bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                    <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#ff6d00]">
                                <FontAwesomeIcon icon={faUserShield} />
                                Staff Portal
                            </span>
                            <span className="rounded-full bg-[#EDE6FA] px-3 py-1 text-xs font-bold text-[#5118A8]">
                                {staffUser.department} Department
                            </span>
                        </div>
                        <h1 className="mt-2 text-2xl font-bold text-[var(--TextHero)] sm:text-3xl">
                            Welcome, {staffUser.name}
                        </h1>
                        <p className="mt-1 text-sm text-[var(--Text)]">
                            Review and respond to student complaints assigned to {staffUser.department}.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 cursor-pointer self-start sm:self-center"
                    >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <span>Log Out</span>
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        {["All", "Pending", "In Review", "Resolved"].map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => setFilterStatus(status)}
                                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${filterStatus === status
                                        ? "bg-[#5118A8] text-white"
                                        : "bg-white text-[#5118A8] border border-[#ECE8F6] hover:bg-[#EDE6FA]"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs font-medium text-[var(--Text)]">
                        Showing {filteredComplaints.length} of {departmentComplaints.length} issues
                    </p>
                </div>

                {/* Complaints List */}
                <div className="space-y-4">
                    {filteredComplaints.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-14 px-4 text-center">
                            <FontAwesomeIcon
                                icon={faFolderOpen}
                                className="mb-3 text-4xl text-[#5118A8]/40"
                            />
                            <p className="text-base font-bold text-[var(--TextHero)]">
                                No complaints in this view
                            </p>
                            <p className="mt-1 text-xs text-[var(--Text)]">
                                Issues submitted to the {staffUser.department} department will appear here.
                            </p>
                        </div>
                    ) : (
                        filteredComplaints.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-[#ECE8F6] bg-white p-5 sm:p-6 shadow-sm space-y-4"
                            >
                                {/* Top Meta + Status Dropdown */}
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--Text)]">
                                            <span className="font-bold text-[#5118A8]">{item.id}</span>
                                            <span>•</span>
                                            <span>{item.category}</span>
                                            <span>•</span>
                                            <span>{item.date}</span>
                                            <span>•</span>
                                            <span className="font-semibold text-gray-700">
                                                Student: {item.studentName}
                                            </span>
                                        </div>
                                        <h2 className="mt-1.5 text-lg font-bold text-[var(--TextHero)]">
                                            {item.subject}
                                        </h2>
                                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Status Control */}
                                    <select
                                        value={item.status || "Pending"}
                                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                        className="rounded-full border border-[#5118A8]/30 bg-[#FAF9FE] px-4 py-2 text-xs font-bold text-[#5118A8] focus:border-[#5118A8] focus:outline-none cursor-pointer shrink-0"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Review">In Review</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </div>

                                {/* Existing Reply Display */}
                                {item.staffReply && (
                                    <div className="rounded-xl border border-purple-200 bg-[#F8F5FE] p-4">
                                        <div className="flex items-center justify-between text-xs text-[#5118A8] font-semibold">
                                            <span>
                                                <FontAwesomeIcon icon={faReply} className="mr-1.5" />
                                                Response from {item.repliedBy || staffUser.name}
                                            </span>
                                            {item.replyDate && <span>{item.replyDate}</span>}
                                        </div>
                                        <p className="mt-1.5 text-sm text-gray-800">{item.staffReply}</p>
                                    </div>
                                )}

                                {/* Reply Input Form */}
                                <form
                                    onSubmit={(e) => handleSendReply(e, item.id)}
                                    className="flex flex-col gap-2.5 pt-2 sm:flex-row"
                                >
                                    <input
                                        type="text"
                                        value={replyDrafts[item.id] || ""}
                                        onChange={(e) =>
                                            setReplyDrafts((prev) => ({
                                                ...prev,
                                                [item.id]: e.target.value,
                                            }))
                                        }
                                        placeholder={
                                            item.staffReply
                                                ? "Update your response to the student..."
                                                : "Write an official response to the student..."
                                        }
                                        className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-[#5118A8] focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5118A8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3f1185] cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        <span>{item.staffReply ? "Update Reply" : "Send Reply"}</span>
                                    </button>
                                </form>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
export default DashboardStaff;