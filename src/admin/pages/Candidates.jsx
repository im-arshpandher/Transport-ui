import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import CandidateModal from "../components/CandidateModal";


const Candidates = () => {

    const [candidates, setCandidates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
    }, []);

    const fetchCandidates = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/candidates`);
            setCandidates(res.data.details.candidates);
            setTotalPages(res?.data?.details?.totalPages || 1);
        } catch (err) {
            console.error("Failed to fetch candidates", err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCandidates();
    }, [currentPage]);



    const updateStatus = async (id, status) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/candidates/${id}`, { status });
            toast.success("Status updated successfully");
            fetchCandidates();
        } catch (err) {
            console.error("Failed to update status", err);
            toast.error("Failed to update status");
        }
    }

    return (
        <div className="p-6">
            <motion.h2
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Candidates Applications
            </motion.h2>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left text-sm">Name</th>
                                <th className="px-4 py-2 text-left text-sm">Email</th>
                                <th className="px-4 py-2 text-left text-sm">Position</th>
                                <th className="px-4 py-2 text-left text-sm">Cover Letter</th>
                                <th className="px-4 py-2 text-left text-sm">Resume</th>
                                <th className="px-4 py-2 text-left text-sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate) => (
                                <motion.tr
                                    key={candidate._id}
                                    className={`border-t cursor-pointer hover:bg-gray-50 hover:border hover:border-blue-600`}
                                    whileHover={{ scale: 1.0 }}
                                    onClick={() => {
                                        if (candidate.status === "applied") {
                                            updateStatus(candidate._id, "waiting");
                                        }
                                        setSelectedCandidate(candidate);
                                    }}
                                >
                                    <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{candidate.name}</td>
                                    <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{candidate.email}</td>
                                    <td className="px-4 py-2 truncate max-w-xs text-left text-sm">{candidate.position}</td>
                                    <td title={candidate.coverLetter} className="px-4 py-2 truncate max-w-xs text-left text-sm">{candidate.coverLetter}</td>
                                    <td className="px-4 py-2 truncate max-w-xs text-left text-sm"><button onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(`http://localhost:5000/files/${candidate.resume}`, "_blank");
                                    }}>View Resume</button></td>
                                    <td className="px-4 py-2 truncate max-w-xs text-left text-sm">
                                        <select onClick={(e) => {
                                            e.stopPropagation();
                                        }} value={candidate.status} onChange={(e) => updateStatus(candidate._id, e.target.value)}>
                                            <option value="applied">Applied</option>
                                            <option value="waiting">Waiting</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>

            {/* Candidate Modal */}
            {selectedCandidate && (
                <CandidateModal
                    candidate={selectedCandidate}
                    onClose={() => setSelectedCandidate(null)}
                />
            )}

            <ToastContainer />
        </div>
    )
}

export default Candidates;