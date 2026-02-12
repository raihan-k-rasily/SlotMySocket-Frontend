import React, { useState, useEffect } from 'react';
import { Badge } from 'flowbite-react';
import {
    HiPlus, HiPencil, HiTrash, HiLocationMarker,
    HiLightningBolt, HiChevronDown, HiChevronUp,
    HiOfficeBuilding, HiCurrencyDollar
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

import OwnerHeader from '../components/OwnerHeader';
import OwnerSidebar from '../components/OwnerSidebar';
import Footer from '../../components/Footer';
import { getViewOwnerStations, getStationSckets, addNewStationsByOwner, addNewsocketByOwner } from '../../services/allAPIs';
import './OwnerStations.css';

const SocketCard = ({ socket }) => {
    // Handling different status colors
    const statusClass = socket.status === 'Available' ? 'status-available' :
        socket.status === 'Charging' ? 'status-charging' : 'status-maintenance';

    return (
        <div className={`socket-card ${statusClass}`}>
            <div className="flex justify-between items-start mb-3">
                <p className="text-xl font-bold socket-id">Socket #{socket.socketId || 'N/A'}</p>
                <Badge color={socket.status === 'Available' ? 'success' : 'failure'}>
                    {socket.status}
                </Badge>
            </div>
            <ul className="socket-details">
                <li><HiLightningBolt className="icon" /> {socket.connectorType} ({socket.powerType} kW)</li>
                <li><HiCurrencyDollar className="icon" /> ₹{socket.pricePerHour}/h</li>
            </ul>
            <div className="flex justify-end gap-3 mt-4">
                <button className="socket-btn btn-edit p-2 rounded hover:opacity-80"><HiPencil /></button>
                <button className="socket-btn btn-delete p-2 rounded hover:opacity-80 text-red-500"><HiTrash /></button>
            </div>
        </div>
    );
};

function OwnerStations() {
    const [stations, setStations] = useState([]);
    const [sockets, setSockets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openStationId, setOpenStationId] = useState(null);
    const [isStationModalOpen, setIsStationModalOpen] = useState(false);
    const [isSocketModalOpen, setIsSocketModalOpen] = useState(false);

    const [stationDetails, setStationDetails] = useState({
        stationName: "",
        latitude: "",
        longitude: "",
        openingAt: "",
        closingAt: ""
    })

    const [socketDetails, setsocketDetails] = useState({
        stationId: "",
        powerType: "",
        connectorType: "",
        pricePerHour: ""

    })
    // Track which station we are adding a socket to
    const [selectedStationForSocket, setSelectedStationForSocket] = useState(null);

    const fetchOwnerStations = async () => {

        const token = sessionStorage.getItem("token");
        if (token) {
            const updatedToken = token.replace(/"/g, "");
            const reqHeader = { "Authorization": `Bearer ${updatedToken}` };
            try {
                const result = await getViewOwnerStations(reqHeader);
                if (result.status === 200) {
                    setStations(result.data);
                    if (result.data.length > 0)
                        setOpenStationId(result.data[0]._id);
                }
            } catch (err) {
                console.error("Error fetching stations:", err);
            } finally {
                setLoading(false);
            }
        }
    };

    const fetchStationSockets = async (stationId) => {
        console.log(stationId);


        const token = sessionStorage.getItem("token");
        if (token) {
            const updatedToken = token.replace(/"/g, "");
            const reqHeader = { "Authorization": `Bearer ${updatedToken}` };
            try {
                const reqBody = { stationId }
                const result = await getStationSckets(reqBody, reqHeader);
                if (result.status === 200) {
                    setSockets(result.data);
                }
            } catch (err) {
                console.error("Error fetching sockets:", err);
            } finally {
                setLoading(false);
            }
        }
    };
    const addSocket = async (stationId) => {
        const token = sessionStorage.getItem("token");
        console.log(stationId);

        // 1. Destructure for easier validation and payload creation

        const { powerType, connectorType, pricePerHour } = socketDetails;

        console.log(socketDetails);



        // 3. Validation Check
        if (!powerType || !connectorType || !pricePerHour) {
            toast.warn("Please fill in all details correctly.", {
                position: "top-center",
                theme: "colored"
            });
            return;
        }

        if (token) {
            // Clean token and setup headers
            const updatedToken = token.replace(/"/g, "");
            const reqHeader = { "Authorization": `Bearer ${updatedToken}` };

            // Prepare the payload to match your controller
            const reqBody = {
                stationId: stationId,
                powerType,
                connectorType,
                pricePerHour
            };

            try {
                console.log('Registering new Socket:', reqBody);

                // Call the API service
                const response = await addNewsocketByOwner(reqBody, reqHeader);

                if (response.status === 201) {
                    toast.success("Socket registered! Waiting for Admin approval.", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "colored",
                    });

                    // Reset form and close modal
                    setsocketDetails({
                        stationId: "",
                        powerType: "",
                        connectorType: "",
                        pricePerHour: ""
                    });
                    setIsSocketModalOpen(false);

                    // Re-fetch the Socket list to show the new pending station
                    // fetchOwnerStations();

                } else {
                    const errorMsg = response.response?.data?.message || "Registration failed.";
                    toast.error(errorMsg, {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "colored",
                    });
                }
            } catch (error) {
                console.error("Socket Registration Error:", error);
                toast.error("Server error. Please check your connection.", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored"
                });
            }
        } else {
            toast.error("Session expired. Please login again.");
        }

    }
    const addOwnerStations = async () => {
        const token = sessionStorage.getItem("token");

        // 1. Destructure for easier validation and payload creation
        const { stationName, latitude, longitude, openingAt, closingAt } = stationDetails;

        // 2. Convert to numbers for coordinate validation
        const latNum = parseFloat(latitude);
        const lonNum = parseFloat(longitude);

        const isValidCoordinate = !isNaN(latNum) && latNum >= -90 && latNum <= 90 &&
            !isNaN(lonNum) && lonNum >= -180 && lonNum <= 180;

        // 3. Validation Check
        if (!stationName || !latitude || !longitude || !openingAt || !closingAt || !isValidCoordinate) {
            toast.warn("Please fill in all details correctly. Ensure coordinates are valid numbers.", {
                position: "top-center",
                theme: "colored"
            });
            return;
        }

        if (token) {
            // Clean token and setup headers
            const updatedToken = token.replace(/"/g, "");
            const reqHeader = { "Authorization": `Bearer ${updatedToken}` };

            // Prepare the payload to match your controller
            const reqBody = {
                stationName,
                latitude: latNum,
                longitude: lonNum,
                openingAt,
                closingAt
            };

            try {
                console.log('Registering new station:', reqBody);

                // Call the API service
                const response = await addNewStationsByOwner(reqBody, reqHeader);

                if (response.status === 201) {
                    toast.success("Station registered! Waiting for Admin approval.", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "colored",
                    });

                    // Reset form and close modal
                    setStationDetails({
                        stationName: "",
                        latitude: "",
                        longitude: "",
                        openingAt: "",
                        closingAt: ""
                    });
                    setIsStationModalOpen(false);

                    // Re-fetch the stations list to show the new pending station
                    fetchOwnerStations();

                } else {
                    const errorMsg = response.response?.data?.message || "Registration failed.";
                    toast.error(errorMsg, {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "colored",
                    });
                }
            } catch (error) {
                console.error("Station Registration Error:", error);
                toast.error("Server error. Please check your connection.", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored"
                });
            }
        } else {
            toast.error("Session expired. Please login again.");
        }
    };
    useEffect(() => {
        fetchOwnerStations();
    }, []);
    useEffect(() => {
        if (openStationId) {
            setSockets([])
            fetchStationSockets(openStationId);
        }
    }, [openStationId]);
    return (
        <div className="admin-dashboard-layout bg-[#0A0A0A] min-h-screen text-[#F0F4F8] flex">
            <OwnerSidebar />
            <div className="admin-main-wrapper flex-grow flex flex-col">
                <OwnerHeader />
                <main className="admin-main-content p-8 flex-grow">
                    <div className="station-page-header flex justify-between items-center mb-8">
                        <div>
                            <h1 className="admin-welcome-title">🔌 My Charging Stations</h1>
                            <p className="text-gray-500 text-sm mt-1">Manage your infrastructure and real-time socket status</p>
                        </div>
                        <button
                            className="btn-add-station flex items-center px-4 py-2 rounded-lg font-bold"
                            onClick={() => setIsStationModalOpen(true)}
                        >
                            <HiPlus className="mr-2" /> Add New Station
                        </button>
                    </div>

                    <div className="space-y-6">
                        {loading ? (
                            <div className="text-center py-20 opacity-50">Loading your stations...</div>
                        ) : stations.length > 0 ? (
                            stations.map((station) => (
                                <div key={station._id} className="station-group-container">
                                    <div className={`station-master-card ${station._id === openStationId ? 'station-open' : ''}`}>
                                        <div
                                            className="station-card-header flex justify-between items-center p-6 cursor-pointer"
                                            onClick={() => setOpenStationId(openStationId === station._id ? null : station._id)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
                                                    <HiOfficeBuilding size={24} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                                                            {station.stationName || "Unnamed Station"}
                                                        </h3>

                                                        {/* Use a span instead of Badge to ensure our CSS wins */}
                                                        <span className={`custom-status-badge ${station.status === 'APPROVED' ? 'status-active' :
                                                            station.status === 'PENDING' ? 'status-pending' : 'status-inactive'
                                                            }`}>
                                                            {station.status || 'Pending'}
                                                        </span>
                                                    </div>

                                                    <div className="station-info-grid mt-3">
                                                        {/* ... existing address and timing code ... */}
                                                        <div className="flex items-start gap-2 mb-3">
                                                            <HiLocationMarker className="mt-1 text-emerald-500 shrink-0" size={18} />
                                                            <div>
                                                                <p className="text-sm text-gray-300 leading-relaxed">
                                                                    {station.location?.address || "No address provided"}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4 border-t border-white/5 pt-3">
                                                            <div className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/20">
                                                                <div className={`w-1.5 h-1.5 rounded-full ${station.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`}></div>
                                                                <span className="text-xs font-medium text-emerald-400">
                                                                    {station.workingHours?.openingAt} — {station.workingHours?.closingAt}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                {station.status === 'APPROVED' ? (
                                                    <button
                                                        className="btn-add-socket px-3 py-1 rounded border text-sm transition-all"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedStationForSocket(station._id);
                                                            setIsSocketModalOpen(true);
                                                        }}
                                                    >
                                                        + Add Socket
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-1 px-3 py-1 bg-gray-500/10 border border-gray-500/20 rounded cursor-not-allowed group relative">
                                                        <span className="text-xs text-gray-500 font-medium">Pending Approval</span>
                                                        {/* Optional Tooltip */}
                                                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-[10px] p-2 rounded w-32 shadow-xl border border-white/10">
                                                            You can add sockets once the admin approves this station.
                                                        </div>
                                                    </div>
                                                )}

                                                {station._id === openStationId ? <HiChevronUp size={24} /> : <HiChevronDown size={24} />}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {station._id === openStationId && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="sockets-collapse-wrapper p-6 border-t border-white/5 bg-black/40">
                                                        {sockets.length > 0 ? (
                                                            <div className="sockets-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                {sockets.map((s, index) => (
                                                                    <SocketCard key={index} socket={s} />
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-xl">
                                                                <p className="text-gray-500">No sockets registered for this station yet.</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                <p className="text-xl text-gray-400">No stations found. Start by adding your first one!</p>
                            </div>
                        )}
                    </div>
                    {/* --- PREMIUM MODAL: ADD STATION --- */}
                    <AnimatePresence>
                        {isStationModalOpen && (
                            <div className="custom-modal-overlay">
                                <motion.div
                                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                                    className="custom-modal-container"
                                >
                                    <div className="modal-header">
                                        <div className="header-glow"></div>
                                        <h3>Register New Station</h3>
                                        <button className="close-x" onClick={() => setIsStationModalOpen(false)}>×</button>
                                    </div>

                                    <div className="modal-body">
                                        {/* Full Width Row */}
                                        <div className="form-group">
                                            <label>Station Name</label>
                                            <input
                                                value={stationDetails.stationName} onChange={e => setStationDetails({ ...stationDetails, stationName: e.target.value })}
                                                type="text" placeholder="e.g. Cyber Plaza Hub" className="custom-input w-full" />
                                        </div>

                                        {/* Coordinates Row: Latitude & Longitude */}
                                        <div className="flex-row gap-4 mb-4">
                                            <div className="form-group flex-1">
                                                <label>Latitude</label>
                                                <input
                                                    value={stationDetails.latitude} onChange={e => setStationDetails({ ...stationDetails, latitude: e.target.value })}
                                                    type="text" placeholder="12.9716" className="custom-input w-full" />
                                            </div>
                                            <div className="form-group flex-1">
                                                <label>Longitude</label>
                                                <input
                                                    value={stationDetails.longitude} onChange={e => setStationDetails({ ...stationDetails, longitude: e.target.value })}
                                                    type="text" placeholder="77.5946" className="custom-input w-full" />
                                            </div>
                                        </div>

                                        {/* Timing Row: Opening & Closing */}
                                        <div className="flex-row gap-4 mb-4">
                                            <div className="form-group flex-1">
                                                <label className="label-open">Opening At</label>
                                                <input
                                                    value={stationDetails.openingAt} onChange={e => setStationDetails({ ...stationDetails, openingAt: e.target.value })}
                                                    type="time" className="custom-input w-full" />
                                            </div>
                                            <div className="form-group flex-1">
                                                <label className="label-close">Closing At</label>
                                                <input
                                                    value={stationDetails.closingAt} onChange={e => setStationDetails({ ...stationDetails, closingAt: e.target.value })}
                                                    type="time" className="custom-input w-full" />
                                            </div>
                                        </div>

                                        {/* Full Width Address */}
                                        {/* <div className="form-group">
                                            <label>Location Address</label>
                                            <textarea rows="2" placeholder="Street, Landmark, City..." className="custom-input w-full"></textarea>
                                        </div> */}
                                    </div>

                                    <div className="modal-footer">
                                        <button className="btn-cancel" onClick={() => setIsStationModalOpen(false)}>Discard</button>
                                        <button className="btn-save shadow-glow" onClick={addOwnerStations}>Confirm Registration</button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* --- PREMIUM MODAL: ADD SOCKET --- */}
                    <AnimatePresence>
                        {isSocketModalOpen && (
                            <div className="custom-modal-overlay">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="custom-modal-container socket-modal"
                                >
                                    <div className="modal-header">
                                        <div className="header-glow blue"></div>
                                        <h3>New Socket Details</h3>
                                        <button className="close-x" onClick={() => setIsSocketModalOpen(false)}>×</button>
                                    </div>

                                    <div className="modal-body">
                                        <div className="form-group mb-6">
                                            <label>Connector Type</label>
                                            <select
                                                value={socketDetails.connectorType} onChange={e => setsocketDetails({ ...socketDetails, connectorType: e.target.value })}
                                                className="custom-input w-full">

                                                <option value="">Select Connector</option>
                                                <option value="CCS">CCS2</option>
                                                <option value="Type2">Type 2</option>
                                                <option value="GB/T">GB/T</option>
                                            </select>
                                        </div>

                                        {/* The Row that was breaking */}
                                        <div className="flex-row gap-4">
                                            {/* Left Half: Power */}
                                            <div className="form-group flex-1">
                                                <label>Power Type</label>
                                                <select
                                                    value={socketDetails.powerType} onChange={e => setsocketDetails({ ...socketDetails, powerType: e.target.value })}
                                                    className="custom-input w-full">
                                                    <option value="">Select Power Type</option>
                                                    <option value="DC">DC </option>
                                                    <option value="AC">AC</option>
                                                </select>
                                            </div>

                                            {/* Right Half: Rate */}
                                            <div className="form-group flex-1">
                                                <label>Price (₹/hour)</label>
                                                <div className="input-with-icon">
                                                    <span className="currency-prefix">₹</span>
                                                    <input
                                                        value={socketDetails.pricePerHour} onChange={e => setsocketDetails({ ...socketDetails, pricePerHour: e.target.value })}
                                                        type="number"
                                                        placeholder="450"
                                                        className="custom-input w-full icon-padding"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button className="btn-cancel" onClick={() => setIsSocketModalOpen(false)}>Cancel</button>
                                        <button className="btn-save shadow-glow" onClick={() => addSocket(selectedStationForSocket)}>Add to Station</button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </main>
                <Footer />
            </div>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </div>
    );


}

export default OwnerStations;