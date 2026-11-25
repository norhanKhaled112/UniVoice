import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Complaint from "../assets/image/form.svg";



 function FormComplaint() {
    const navigate = useNavigate();
    const currentUser = JSON.parse(
        localStorage.getItem("univoice_user") || "null"
    );

    const [category, setCategory] = useState("Academic");
    const [department, setDepartment] = useState(
        currentUser?.department || "Computer Science"
    );
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [fileName, setFileName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingComplaints = JSON.parse(
            localStorage.getItem("univoice_complaints") || "[]"
        );

        const newComplaint = {
            id: `UV-${Math.floor(100000 + Math.random() * 900000)}`,
            category,
            
            subject: subject.trim(),
            description: description.trim(),
            fileName,
            studentName: currentUser?.name || "Anonymous Student",
            studentEmail: currentUser?.email || "",
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            status: "Pending",
            staffReply: "",
        };

        localStorage.setItem(
            "univoice_complaints",
            JSON.stringify([newComplaint, ...existingComplaints])
        );

        handleCancel();
        navigate("/profile");
    };

    const handleCancel = () => {
        setCategory("Academic");
        setDepartment(currentUser?.department || "Computer Science");
        setSubject("");
        setDescription("");
        setFileName("");
    };

    return (
        <div className="mx-auto mt-6 mb-14 flex w-full max-w-7xl flex-col items-center justify-between gap-10 px-4 sm:px-8 lg:flex-row lg:items-start lg:gap-12 lg:px-12">
            <div className="w-full lg:w-2/3">
                <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-[#1B1159]">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-800 focus:border-[#5118A8] focus:outline-none"
                            >
                                <option value="Academic">Academic</option>
                                <option value="Facilities & Dorms">Facilities &amp; Dorms</option>
                                <option value="Campus Safety">Campus Safety</option>
                                <option value="Administration">Administration</option>
                                <option value="Teaching Assistant">Teaching Assistant</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            
                          
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#1B1159]">
                            Subject
                        </label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Brief title of your complaint"
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-[#5118A8] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#1B1159]">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide detailed description of the issue..."
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-[#5118A8] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#1B1159]">
                            Attach Supporting Evidence{" "}
                            <span className="font-normal text-gray-500">(Optional)</span>
                        </label>
                        <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white/70 px-4 py-3 text-sm text-gray-600 transition hover:border-[#5118A8]">
                            <i className="fa-solid fa-cloud-arrow-up shrink-0 text-lg text-[#5118A8]" />
                            <span className="truncate">
                                {fileName || "Click to browse (images, PDF, max 5MB)"}
                            </span>
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-full bg-[#5118A8] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3f1185] cursor-pointer"
                        >
                            <span>Submit Complaint</span>
                            <i className="fa-solid fa-arrow-right" />
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <div className="hidden w-full items-center justify-center lg:flex lg:w-1/3">
                <img
                    src={Complaint}
                    alt="Complaint submission illustration"
                    className="h-auto w-full max-w-md object-contain"
                />
            </div>
        </div>
    );
}
export default FormComplaint;