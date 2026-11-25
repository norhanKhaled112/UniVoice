import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faIdCard,
    faEnvelope,
    faBuildingColumns,
    faPenToSquare,
    faCheck,
    faXmark,
    faClock,
    faCircleCheck,
    faSpinner,
    faPlus,
    faArrowRightFromBracket,
    faTrashCan,
    faFolderOpen,
    faReply,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const EMPTY_USER = {
    name: "",
    uniId: "",
    email: "",
    department: "",
    role: "Student",
};

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem("univoice_user");
            return saved ? JSON.parse(saved) : EMPTY_USER;
        } catch {
            return EMPTY_USER;
        }
    });

    const [complaints, setComplaints] = useState(() => {
        try {
            const saved = localStorage.getItem("univoice_complaints");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [draftUser, setDraftUser] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        setDraftUser(user);
    }, [user]);

    const studentComplaints = complaints.filter(
        (c) =>
            !c.studentEmail ||
            !user.email ||
            c.studentEmail.toLowerCase() === user.email.toLowerCase()
    );

    const handleSave = (e) => {
        e.preventDefault();
        const updatedUser = { ...draftUser, department: user.department };
        setUser(updatedUser);
        setIsEditing(false);
        localStorage.setItem("univoice_user", JSON.stringify(updatedUser));
    };

    const handleCancel = () => {
        setDraftUser(user);
        setIsEditing(false);
    };

    const handleDelete = (id) => {
        const updated = complaints.filter((item) => item.id !== id);
        setComplaints(updated);
        localStorage.setItem("univoice_complaints", JSON.stringify(updated));
    };

    const handleLogout = () => {
        localStorage.removeItem("univoice_user");
        navigate("/login");
    };

    const totalCount = studentComplaints.length;
    const resolvedCount = studentComplaints.filter(
        (c) => c.status?.toLowerCase() === "resolved"
    ).length;
    const activeCount = totalCount - resolvedCount;

    const filteredComplaints =
        filterStatus === "All"
            ? studentComplaints
            : studentComplaints.filter(
                (c) =>
                    (c.status || "Pending").toLowerCase() === filterStatus.toLowerCase()
            );

    const getStatusBadge = (status = "Pending") => {
        const normalized = status.toLowerCase();
        if (normalized === "resolved") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <FontAwesomeIcon icon={faCircleCheck} />
                    Resolved
                </span>
            );
        }
        if (normalized === "in review") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-[#5118A8]">
                    <FontAwesomeIcon icon={faSpinner} />
                    In Review
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                <FontAwesomeIcon icon={faClock} />
                Pending
            </span>
        );
    };

    const getInitials = (fullName) => {
        if (!fullName || !fullName.trim()) return "UV";
        return fullName
            .trim()
            .split(/\s+/)
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8F7FC] to-[#F3F0FA] px-4 py-8 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-6xl space-y-8">
                {/* Top Profile Header Card */}
                <div className="overflow-hidden rounded-2xl border border-[#ECE8F6] bg-white shadow-sm">
                    <div className="h-28 sm:h-36 bg-gradient-to-r from-[#5118A8] to-[#7434D6]" />

                    <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                            <div className="-mt-12 sm:-mt-14 flex flex-col sm:flex-row sm:items-end gap-4">
                                <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl border-4 border-white bg-[#EDE6FA] text-2xl sm:text-3xl font-bold text-[#5118A8] shadow-md">
                                    {getInitials(user.name)}
                                </div>
                                <div className="pb-1">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--TextHero)]">
                                            {user.name || "Guest Student"}
                                        </h1>
                                        <span className="rounded-full bg-[var(--bgHero)] px-3 py-0.5 text-xs font-semibold text-[var(--TextHeroSecondaryFirst)]">
                                            {user.role || "Student"}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-[var(--Text)]">
                                        {user.department || "No department set"} • ID:{" "}
                                        {user.uniId || "—"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                                {!isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDraftUser(user);
                                            setIsEditing(true);
                                        }}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#5118A8] bg-white px-5 py-2 text-sm font-semibold text-[#5118A8] transition hover:bg-[#F6F3FC] cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                        <span>Edit Profile</span>
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-2 rounded-full bg-red-50 px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5 border-t border-gray-100 pt-6">
                            <div className="rounded-xl bg-[#FAF9FE] p-3.5 sm:p-4 text-center">
                                <p className="text-xl sm:text-2xl font-bold text-[#5118A8]">
                                    {totalCount}
                                </p>
                                <p className="mt-0.5 text-xs sm:text-sm text-[var(--Text)]">
                                    Total Submitted
                                </p>
                            </div>
                            <div className="rounded-xl bg-[#FAF9FE] p-3.5 sm:p-4 text-center">
                                <p className="text-xl sm:text-2xl font-bold text-amber-600">
                                    {activeCount}
                                </p>
                                <p className="mt-0.5 text-xs sm:text-sm text-[var(--Text)]">
                                    Active / Pending
                                </p>
                            </div>
                            <div className="rounded-xl bg-[#FAF9FE] p-3.5 sm:p-4 text-center">
                                <p className="text-xl sm:text-2xl font-bold text-emerald-600">
                                    {resolvedCount}
                                </p>
                                <p className="mt-0.5 text-xs sm:text-sm text-[var(--Text)]">
                                    Resolved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column: Account Information */}
                    <div className="rounded-2xl border border-[#ECE8F6] bg-white p-6 shadow-sm h-fit">
                        <h2 className="text-lg font-bold text-[var(--TextHero)]">
                            Account Information
                        </h2>
                        <p className="mt-1 text-xs text-[var(--Text)]">
                            Your registered university details
                        </p>

                        {isEditing ? (
                            <form onSubmit={handleSave} className="mt-5 space-y-4">
                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-[var(--TextHero)]">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={draftUser.name}
                                        onChange={(e) =>
                                            setDraftUser({ ...draftUser, name: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#5118A8] focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-[var(--TextHero)]">
                                        Uni ID
                                    </label>
                                    <input
                                        type="text"
                                        value={draftUser.uniId}
                                        onChange={(e) =>
                                            setDraftUser({ ...draftUser, uniId: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#5118A8] focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-[var(--TextHero)]">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={draftUser.email}
                                        onChange={(e) =>
                                            setDraftUser({ ...draftUser, email: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#5118A8] focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="flex items-center gap-2.5 pt-2">
                                    <button
                                        type="submit"
                                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#5118A8] py-2 text-sm font-semibold text-white hover:bg-[#3f1185] cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                        <span>Save</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-300 bg-white py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <ul className="mt-5 space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4EFFC] text-[#5118A8]">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    <div>
                                        <p className="text-xs text-[var(--Text)]">Full Name</p>
                                        <p className="font-semibold text-[var(--TextHero)]">
                                            {user.name || "Not provided"}
                                        </p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4EFFC] text-[#5118A8]">
                                        <FontAwesomeIcon icon={faIdCard} />
                                    </span>
                                    <div>
                                        <p className="text-xs text-[var(--Text)]">University ID</p>
                                        <p className="font-semibold text-[var(--TextHero)]">
                                            {user.uniId || "Not provided"}
                                        </p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4EFFC] text-[#5118A8]">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-xs text-[var(--Text)]">Email</p>
                                        <p className="truncate font-semibold text-[var(--TextHero)]">
                                            {user.email || "Not provided"}
                                        </p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4EFFC] text-[#5118A8]">
                                        <FontAwesomeIcon icon={faBuildingColumns} />
                                    </span>
                                    <div>
                                        <p className="text-xs text-[var(--Text)]">Department</p>
                                        <p className="font-semibold text-[var(--TextHero)]">
                                            {user.department || "Not provided"}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Right Column: Student Complaints & Staff Replies */}
                    <div className="lg:col-span-2 rounded-2xl border border-[#ECE8F6] bg-white p-6 shadow-sm">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-lg font-bold text-[var(--TextHero)]">
                                    My Complaints &amp; Suggestions
                                </h2>
                                <p className="mt-0.5 text-xs text-[var(--Text)]">
                                    Track the status and staff responses of your submitted tickets
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/complaint")}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5118A8] px-5 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#3f1185] cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <span>New Complaint</span>
                            </button>
                        </div>

                        {/* Filter Pills */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            {["All", "Pending", "In Review", "Resolved"].map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setFilterStatus(status)}
                                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${filterStatus === status
                                            ? "bg-[#5118A8] text-white"
                                            : "bg-[#F4EFFC] text-[#5118A8] hover:bg-[#EDE6FA]"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* Complaints List */}
                        <div className="mt-5 space-y-3.5">
                            {filteredComplaints.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-[#FAF9FE] py-12 px-4 text-center">
                                    <FontAwesomeIcon
                                        icon={faFolderOpen}
                                        className="text-3xl text-[#5118A8]/40 mb-3"
                                    />
                                    <p className="text-sm font-semibold text-[var(--TextHero)]">
                                        {studentComplaints.length === 0
                                            ? "No complaints submitted yet"
                                            : `No complaints with status "${filterStatus}"`}
                                    </p>
                                    <p className="mt-1 text-xs text-[var(--Text)] max-w-sm">
                                        Once you file a complaint or suggestion, it will appear here so you can track its progress.
                                    </p>
                                </div>
                            ) : (
                                filteredComplaints.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-xl border border-gray-200/80 bg-[#FAF9FE] p-4 transition hover:border-[#5118A8]/40 space-y-3"
                                    >
                                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                            <div className="space-y-1">
                                                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--Text)]">
                                                    <span className="font-bold text-[#5118A8]">
                                                        {item.id}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="font-semibold text-gray-700">
                                                        {item.department}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{item.category}</span>
                                                    {item.date && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{item.date}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <h3 className="text-sm sm:text-base font-bold text-[var(--TextHero)]">
                                                    {item.subject}
                                                </h3>
                                                {item.description && (
                                                    <p className="text-xs text-[var(--Text)]">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2.5 shrink-0">
                                                {getStatusBadge(item.status)}
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item.id)}
                                                    title="Delete complaint"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
                                                </button>
                                            </div>
                                        </div>

                                        {item.staffReply && (
                                            <div className="rounded-lg border border-purple-200 bg-white p-3 text-xs">
                                                <p className="font-bold text-[#5118A8]">
                                                    <FontAwesomeIcon icon={faReply} className="mr-1.5" />
                                                    Response from {item.repliedBy || "Department Staff"}:
                                                </p>
                                                <p className="mt-1 text-gray-700">{item.staffReply}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile ;