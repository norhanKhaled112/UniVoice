import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import complaintImg from "../assets/image/form.svg";

function FormComplaint() {
    const navigate = useNavigate();

    const [category, setCategory] = useState("Academic");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const currentUser = JSON.parse(localStorage.getItem("univoice_user"));
        if (!currentUser || currentUser.role?.toLowerCase() !== "student") {
            setError("Please log in with a student account to submit a complaint.");
            return;
        }

        const existingComplaints =
            JSON.parse(localStorage.getItem("univoice_complaints")) || [];

        const newComplaint = {
            id: Date.now(),
            studentName: currentUser.name,
            studentEmail: currentUser.email,
            category: category,
            subject: subject.trim(),
            description: description.trim(),
            file: fileName || null,
            status: "Pending",
            reply: "",
            date: new Date().toLocaleDateString(),
        };

        localStorage.setItem(
            "univoice_complaints",
            JSON.stringify([newComplaint, ...existingComplaints])
        );

        navigate("/profile");
    };

    return (
        <div className="mx-auto my-8 w-full max-w-7xl px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
               
                <div className="w-full rounded-2xl border border-[var(--TextHeroSecondaryFirst)]/20 bg-white p-6 shadow-sm sm:p-10 lg:w-2/3">
                    <form onSubmit={handleSubmit} className="space-y-6">
                     
                        <div>
                            <label
                                htmlFor="category"
                                className="mb-2 block text-sm font-semibold text-[var(--TextMain)] sm:text-base"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[var(--TextMain)] focus:border-[var(--TextHeroSecondaryFirst)] focus:outline-none sm:text-base"
                            >
                                <option value="Academic">Academic</option>
                                <option value="Administrative">Administrative</option>
                                <option value="Facilities & Campus">Facilities & Campus</option>
                                <option value="IT & Technical Support">IT & Technical Support</option>
                                <option value="Suggestion">General Suggestion</option>
                            </select>
                        </div>

                        
                        <div>
                            <label
                                htmlFor="subject"
                                className="mb-2 block text-sm font-semibold text-[var(--TextMain)] sm:text-base"
                            >
                                Subject
                            </label>
                            <input
                                id="subject"
                                type="text"
                                required
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Brief title of your complaint or suggestion"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[var(--TextMain)] focus:border-[var(--TextHeroSecondaryFirst)] focus:outline-none sm:text-base"
                            />
                        </div>

                       
                        <div>
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-semibold text-[var(--TextMain)] sm:text-base"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows="6"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your issue clearly so the administration can assist..."
                                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-[var(--TextMain)] focus:border-[var(--TextHeroSecondaryFirst)] focus:outline-none sm:text-base"
                            />
                        </div>

                        
                        <div>
                            <label
                                htmlFor="attachment"
                                className="mb-2 block text-sm font-semibold text-[var(--TextMain)] sm:text-base"
                            >
                                Attachment{" "}
                                <span className="font-normal text-[var(--Text)]">(Optional)</span>
                            </label>
                            <input
                                id="attachment"
                                type="file"
                                onChange={handleFileChange}
                                className="w-full cursor-pointer text-sm text-[var(--Text)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--bgHero)] file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-[var(--TextHeroSecondaryFirst)] hover:file:opacity-90"
                            />
                            {fileName && (
                                <p className="mt-1.5 text-xs text-[var(--Text)]">
                                    Selected file: {fileName}
                                </p>
                            )}
                        </div>

                        {error && (
                            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-xl bg-[var(--TextHeroSecondaryFirst)] py-3.5 text-base font-bold text-white transition hover:bg-[var(--TextHeroSecondarySecond)]"
                        >
                            Submit Complaint
                        </button>
                    </form>
                </div>

               
                <div className="hidden lg:flex lg:w-1/3 lg:items-center lg:justify-center lg:pt-8">
                    <img
                        src={complaintImg}
                        alt="Submit Complaint Illustration"
                        className="h-auto w-full max-w-xs"
                    />
                </div>
            </div>
        </div>
    );
}

export default FormComplaint;