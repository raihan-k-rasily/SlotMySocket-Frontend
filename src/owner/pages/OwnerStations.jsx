import React, { useState } from 'react';
// We'll use framer-motion for the folding Sockets section instead of Flowbite Collapse
import { Card, Button, Badge } from 'flowbite-react';
import { HiPlus, HiPencil, HiTrash, HiLocationMarker, HiLightningBolt, HiChevronDown, HiChevronUp, HiOfficeBuilding } from 'react-icons/hi';
import OwnerHeader from '../components/OwnerHeader';
import OwnerSidebar from '../components/OwnerSidebar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import './OwnerStations.css';

// --- Mock Data (No change) ---
const mockStations = [
    {
        id: 1,
        name: 'Tech Hub Parking Lot A',
        coordinates: 'Lat: 34.0522, Lon: -118.2437',
        address: '123 Silicon Valley Blvd, CA 90012',
        sockets: [
            { id: 'A1', type: 'Level 2', status: 'Available', power: '7.2 kW', price: '$0.30/kWh' },
            { id: 'A2', type: 'DC Fast', status: 'Charging', power: '50 kW', price: '$0.50/kWh' },
            { id: 'A3', type: 'Level 2', status: 'Maintenance', power: '7.2 kW', price: '$0.30/kWh' },
        ]
    },
    {
        id: 2,
        name: 'Downtown Garage B',
        coordinates: 'Lat: 40.7128, Lon: -74.0060',
        address: '456 Battery Street, NY 10005',
        sockets: [
            { id: 'B1', type: 'Level 2', status: 'Available', power: '7.2 kW', price: '$0.30/kWh' },
            { id: 'B2', type: 'Level 2', status: 'Available', power: '7.2 kW', price: '$0.30/kWh' },
        ]
    }
];

// --- Component for an Individual Socket (No change) ---
const SocketCard = ({ socket, stationId }) => {
    // ... (SocketCard component remains the same)
    const statusClass = {
        'Available': 'status-available',
        'Charging': 'status-charging',
        'Maintenance': 'status-maintenance'
    }[socket.status] || 'status-default';

    return (
        <Card className={`socket-card ${statusClass}`}>
            <div className="flex justify-between items-start mb-3">
                <p className="text-xl font-bold tracking-tight socket-id">Socket #{socket.id}</p>
                <Badge color={socket.status === 'Available' ? 'success' : socket.status === 'Charging' ? 'failure' : 'warning'} className="socket-badge">
                    {socket.status}
                </Badge>
            </div>

            <ul className="socket-details">
                <li>
                    <HiLightningBolt className="icon" />
                    <span>Type:</span> **{socket.type}** ({socket.power})
                </li>
                <li>
                    <span>Rate:</span> **{socket.price}**
                </li>
            </ul>

            <div className="flex justify-end gap-3 mt-4">
                <Button size="xs" color="light" className="socket-btn btn-edit">
                    <HiPencil className="h-4 w-4" />
                </Button>
                <Button size="xs" color="failure" className="socket-btn btn-delete">
                    <HiTrash className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
};


function OwnerStations() {
    // State to track which station is expanded 
    const [openStationId, setOpenStationId] = useState(mockStations[0].id);

    const toggleCollapse = (id) => {
        setOpenStationId(id === openStationId ? null : id);
    };

    return (
        <div className="admin-dashboard-layout">
            <OwnerSidebar />

            <div className="admin-main-wrapper">
                <OwnerHeader />

                <main className="admin-main-content">
                    <div className="station-page-header">
                        <h1 className="admin-welcome-title">🔌 My Charging Stations</h1>

                        <Button className="btn-add-station">
                            <HiOfficeBuilding className="icon-left" />
                            Add New Station
                        </Button>
                    </div>

                    <p className="admin-subtitle">Manage your physical charging locations and individual socket availability.</p>

                    {mockStations.map((station) => {
                        const isOpen = station.id === openStationId;
                        return (
                            <motion.div
                                key={station.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="station-group-container"
                            >
                                <Card className={`station-master-card ${isOpen ? 'station-open' : ''}`}>
                                    {/* Station Header - Clickable for Collapse */}
                                    <div
                                        className="station-card-header"
                                        onClick={() => toggleCollapse(station.id)}
                                    >
                                        {/* Left: Station Details */}
                                        <div className="flex flex-col gap-2 flex-grow">
                                            <h2 className="text-2xl font-extrabold tracking-tight station-name">{station.name}</h2>
                                            <p className="text-sm station-location">
                                                <HiLocationMarker className="inline-block h-4 w-4 mr-1 text-admin-primary-color" />
                                                {station.address}
                                            </p>
                                            <p className="text-xs text-admin-text-muted">
                                                Total Sockets: **{station.sockets.length}** | Active: **{station.sockets.filter(s => s.status === 'Available' || s.status === 'Charging').length}**
                                            </p>
                                        </div>

                                        {/* Right: Action Button & Collapse Toggle */}
                                        <div className="flex items-center gap-4">
                                            <Button size="sm" className="btn-add-socket" onClick={(e) => { e.stopPropagation(); alert(`Adding socket to ${station.name}`); }}>
                                                <HiPlus className="mr-2 h-5 w-5" />
                                                Add socket
                                            </Button>
                                            {isOpen ? (
                                                <HiChevronUp className="h-6 w-6 text-admin-primary-color transition-transform" />
                                            ) : (
                                                <HiChevronDown className="h-6 w-6 text-admin-primary-color transition-transform" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Sockets Container (Collapsible Content) - Replaced Flowbite Collapse with framer-motion */}
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="sockets-collapse-wrapper"
                                        >
                                            <div className="sockets-grid mt-6">
                                                {station.sockets.length > 0 ? (
                                                    station.sockets.map(socket => (
                                                        <SocketCard key={socket.id} socket={socket} stationId={station.id} />
                                                    ))
                                                ) : (
                                                    <p className="no-sockets-message">No charging sockets added yet for this station.</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </Card>
                            </motion.div>
                        );
                    })}
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default OwnerStations;