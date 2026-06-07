import React from "react";
import { motion } from "framer-motion";

const CandidateModal = ({ candidate, onClose }) => {
    if (!candidate) return null;

    const isPDF = candidate.resume.endsWith(".pdf");

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={onClose}
                >
                    Close
                </button>
                <h2 className="text-2xl font-bold mb-4">{candidate.name}</h2>
                <p><strong>Email:</strong> {candidate.email}</p>
                <p><strong>Position:</strong> {candidate.position}</p>
                <p><strong>Cover Letter:</strong> {candidate.coverLetter}</p>
                <div className="mt-4">
                    <strong>Resume:</strong>
                    {isPDF ? (
                        <iframe
                            src={`http://localhost:5000/files/${candidate.resume}`}
                            className="w-full h-[60vh] mt-2"
                            title="Resume"
                        ></iframe>
                    ) : (
                        <a
                            href={`http://localhost:5000/files/${candidate.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600"
                        >
                            View Resume
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default CandidateModal; 