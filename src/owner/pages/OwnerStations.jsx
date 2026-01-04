import React, { useState } from 'react';
// Only keeping the essentials from Flowbite
import { Button, Badge, Modal, TextInput, Select, Textarea } from 'flowbite-react';
import { 
    HiPlus, HiPencil, HiTrash, HiLocationMarker, 
    HiLightningBolt, HiChevronDown, HiChevronUp, 
    HiOfficeBuilding, HiCurrencyDollar 
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import OwnerHeader from '../components/OwnerHeader';
import OwnerSidebar from '../components/OwnerSidebar';
import Footer from '../../components/Footer';

import './OwnerStations.css';

const mockStations = [
    {
        id: 1,
        name: 'Tech Hub Parking Lot A',
        address: '123 Silicon Valley Blvd, CA 90012',
        sockets: [
            { id: 'A1', type: 'Level 2', status: 'Available', power: '7.2 kW', price: '$0.30/h' },
            { id: 'A2', type: 'DC Fast', status: 'Charging', power: '50 kW', price: '$0.50/h' },
        ]
    }
];

const SocketCard = ({ socket }) => {
    const statusClass = socket.status === 'Available' ? 'status-available' : 
                        socket.status === 'Charging' ? 'status-charging' : 'status-maintenance';

    return (
        <div className={`socket-card ${statusClass}`}>
            <div className="flex justify-between items-start mb-3">
                <p className="text-xl font-bold socket-id">Socket #{socket.id}</p>
                <Badge color={socket.status === 'Available' ? 'success' : 'failure'}>
                    {socket.status}
                </Badge>
            </div>
            <ul className="socket-details">
                <li><HiLightningBolt className="icon" /> {socket.type} ({socket.power})</li>
                <li><HiCurrencyDollar className="icon" /> {socket.price}</li>
            </ul>
            <div className="flex justify-end gap-3 mt-4">
                <button className="socket-btn btn-edit p-2 rounded hover:opacity-80"><HiPencil /></button>
                <button className="socket-btn btn-delete p-2 rounded hover:opacity-80 text-red-500"><HiTrash /></button>
            </div>
        </div>
    );
};

function OwnerStations() {
    const [openStationId, setOpenStationId] = useState(1);
    const [isStationModalOpen, setIsStationModalOpen] = useState(false);
    const [isSocketModalOpen, setIsSocketModalOpen] = useState(false);
    const [selectedStationName, setSelectedStationName] = useState("");

    return (
        <div className="admin-dashboard-layout bg-[#0A0A0A] min-h-screen text-[#F0F4F8] flex">
            <OwnerSidebar />
            
            <div className="admin-main-wrapper flex-grow flex flex-col">
                <OwnerHeader />
                
                <main className="admin-main-content p-8 flex-grow">
                    <div className="station-page-header flex justify-between items-center mb-8">
                        <h1 className="admin-welcome-title">🔌 My Charging Stations</h1>
                        <button 
                            className="btn-add-station flex items-center px-4 py-2 rounded-lg font-bold"
                            onClick={() => setIsStationModalOpen(true)}
                        >
                            <HiPlus className="mr-2" /> Add New Station
                        </button>
                    </div>

                    <div className="space-y-6">
                        {mockStations.map((station) => (
                            <div key={station.id} className="station-group-container">
                                <div className={`station-master-card ${station.id === openStationId ? 'station-open' : ''}`}>
                                    <div 
                                        className="station-card-header flex justify-between items-center p-6 cursor-pointer"
                                        onClick={() => setOpenStationId(openStationId === station.id ? null : station.id)}
                                    >
                                        <div>
                                            <h2 className="text-2xl font-bold station-name">{station.name}</h2>
                                            <div className="station-location flex items-center mt-1 text-sm opacity-70">
                                                <HiLocationMarker className="mr-1" /> {station.address}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button 
                                                className="btn-add-socket px-3 py-1 rounded border text-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedStationName(station.name);
                                                    setIsSocketModalOpen(true);
                                                }}
                                            >
                                                + Add Socket
                                            </button>
                                            {station.id === openStationId ? <HiChevronUp size={24}/> : <HiChevronDown size={24}/>}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {station.id === openStationId && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }} 
                                                animate={{ height: 'auto', opacity: 1 }} 
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-black/20"
                                            >
                                                <div className="sockets-collapse-wrapper p-6 border-t border-white/5">
                                                    <div className="sockets-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {station.sockets.map(s => <SocketCard key={s.id} socket={s} />)}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
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
                    <div className="form-group">
                        <label>Station Name</label>
                        <input type="text" placeholder="e.g. Cyber Plaza Hub" className="custom-input" />
                    </div>
                    
                    {/* Latitude & Longitude Row */}
                    <div className="flex-row gap-4">
                        <div className="form-group flex-1">
                            <label>Latitude</label>
                            <input type="text" placeholder="12.9716" className="custom-input" />
                        </div>
                        <div className="form-group flex-1">
                            <label>Longitude</label>
                            <input type="text" placeholder="77.5946" className="custom-input" />
                        </div>
                    </div>

                    {/* <div className="form-group">
                        <label>Location Address</label>
                        <textarea rows="2" placeholder="Street, Landmark, City..." className="custom-input"></textarea>
                    </div> */}
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => setIsStationModalOpen(false)}>Discard</button>
                    <button className="btn-save shadow-glow">Confirm Registration</button>
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
                    <div className="form-group">
                        <label>Charger Protocol</label>
                        <select className="custom-input">
                            <option>CCS2 (DC Fast)</option>
                            <option>Type 2 (AC)</option>
                            <option>GB/T</option>
                        </select>
                    </div>
                    
                    <div className="flex-row gap-4">
                        <div className="form-group flex-1">
                            <label>Power (kW)</label>
                            <input type="number" placeholder="60" className="custom-input" />
                        </div>
                        <div className="form-group flex-1">
                            <label>Rate (₹/hour)</label>
                            <div className="input-with-icon">
                                <span className="currency-prefix">₹</span>
                                <input type="number" placeholder="450" className="custom-input icon-padding" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => setIsSocketModalOpen(false)}>Cancel</button>
                    <button className="btn-save shadow-glow">Add to Station</button>
                </div>
            </motion.div>
        </div>
    )}
</AnimatePresence>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default OwnerStations;