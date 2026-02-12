import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import { getUserStation } from '../../services/allAPIs';
import { Link } from 'react-router-dom'

import 'leaflet/dist/leaflet.css';
import './Stations.css';

import L from 'leaflet';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import evMarker from '../../assets/ev-marker.png';

// 🛑 Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// --- Design Constants ---
const DEEP_DARK = '#0D1117';
const HIGHLIGHT_GREEN = '#00A36C';
const TEXT_WHITE = '#E2E8F0';
const TEXT_GRAY = '#6B7280';

// --- Framer Motion ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { delayChildren: 0.3, staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
};




// --- Auto Fit Map to Stations ---
const FitBounds = ({ stations }) => {
    const map = useMap();

    useEffect(() => {
        if (!stations.length) return;

        const bounds = stations.map(st => [
            Number(st.location.latitude),
            Number(st.location.longitude)
        ]);

        map.fitBounds(bounds, { padding: [50, 50] });
    }, [stations, map]);

    return null;
};


const evStationIcon = new L.Icon({
    iconUrl: evMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});


// --- Filter Panel ---
const FilterPanel = ({ from, to, setFrom, setTo, handleRouteSearch }) => (
    <motion.div
        variants={itemVariants}
        className="filter-panel"
        style={{ backgroundColor: '#161B22', color: TEXT_WHITE }}
    >
        <h2 className="text-2xl font-bold mb-4" style={{ color: HIGHLIGHT_GREEN }}>
            Filter Stations
        </h2>

        <div className="filter-group">
            <label>From:</label>
            <input type="text"
                value={from}
                placeholder="Enter starting point..."
                onChange={(e) => setFrom(e.target.value)}
            />
        </div>
        <div className="filter-group">
            <label>To:</label>
            <input type="text"
                value={to}
                placeholder="Enter destination..."
                onChange={(e) => setTo(e.target.value)}
            />
        </div>
        <div className="filter-group">
            <button
                onClick={handleRouteSearch}
                className="filter-panel">Find Route</button>
        </div>

        <div className="filter-group">
            <label style={{ color: TEXT_GRAY }}>Connector Type:</label>
            <select>
                <option>All</option>
                <option>CCS</option>
                <option>CHAdeMO</option>
                <option>Type 2</option>
            </select>
        </div>

        <div className="filter-group">
            <label style={{ color: TEXT_GRAY }}>Availability:</label>
            <select>
                <option>Available Now</option>
                <option>All Stations</option>
            </select>
        </div>
    </motion.div>
);

const geocodeLocation = async (place) => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
        );
        const data = await res.json();

        if (data.length > 0) {
            return [
                parseFloat(data[0].lat),
                parseFloat(data[0].lon)
            ];
        }
    } catch (err) {
        console.error("Geocoding error:", err);
    }
    return null;
};

const RouteControl = ({ fromCoords, toCoords }) => {
    const map = useMap();
    const routingRef = React.useRef(null);

    useEffect(() => {
        if (!fromCoords || !toCoords) return;

        // Remove old routing if exists
        if (routingRef.current) {
            map.removeControl(routingRef.current);
        }

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(fromCoords[0], fromCoords[1]),
                L.latLng(toCoords[0], toCoords[1])
            ],
            routeWhileDragging: false,
            addWaypoints: false,
            show: false
        }).addTo(map);

        routingRef.current = routingControl;

        return () => {
            if (routingRef.current) {
                map.removeControl(routingRef.current);
            }
        };

    }, [fromCoords, toCoords, map]);

    return null;
};



// --- MAIN COMPONENT ---
function Stations() {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [fromCoords, setFromCoords] = useState(null);
    const [toCoords, setToCoords] = useState(null);


    const [stations, setStations] = useState([]);

    const handleRouteSearch = async () => {
        if (!from || !to) return;

        const start = await geocodeLocation(from);
        const end = await geocodeLocation(to);

        if (start && end) {
            setFromCoords(start);
            setToCoords(end);
        }
    };


    const fetchApprovedStations = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const reqHeader = {
            Authorization: `Bearer ${token.replace(/"/g, "")}`
        };

        try {
            const result = await getUserStation(reqHeader);
            if (result.status === 200) {
                setStations(result.data);
            }
        } catch (err) {
            console.error("Error fetching stations:", err);
        }
    };




    useEffect(() => {
        fetchApprovedStations();
    }, []);

    return (
        <div style={{ backgroundColor: DEEP_DARK, minHeight: '100vh' }}>

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="stations-header-wrapper"
            >
                <Header />
            </motion.div>

            {/* CONTENT */}
            <div className="stations-page-content">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="stations-wrapper"
                >
                    <motion.div variants={itemVariants} className="stations-header">
                        <h1 style={{ color: TEXT_WHITE }}>
                            Find Your <span style={{ color: HIGHLIGHT_GREEN }}>Charge</span>
                        </h1>
                        <p style={{ color: TEXT_GRAY }}>
                            Discover available charging stations near you
                        </p>
                    </motion.div>

                    <div className="stations-grid">

                        {/* LEFT */}
                        <FilterPanel
                            from={from}
                            to={to}
                            setFrom={setFrom}
                            setTo={setTo}
                            handleRouteSearch={handleRouteSearch}
                        />

                        {/* RIGHT (MAP) */}
                        <MapContainer
                            center={[10.8505, 76.2711]}
                            zoom={8}
                            style={{ height: "500px", width: "100%", borderRadius: "16px" }}
                        >
                            <TileLayer
                                attribution="© OpenStreetMap contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {fromCoords && toCoords && (
                                <RouteControl
                                    fromCoords={fromCoords}
                                    toCoords={toCoords}
                                />
                            )}


                            <FitBounds stations={stations} />

                            {stations.length === 0 && (
                                <Popup position={[10.8505, 76.2711]}>
                                    No approved stations found
                                </Popup>
                            )}

                            {stations.map(station => (
                                <Marker
                                    key={station._id}
                                    position={[
                                        Number(station.location.latitude),
                                        Number(station.location.longitude),
                                    ]}
                                    icon={evStationIcon}
                                >
                                    {/* Station name always visible */}
                                    <Tooltip
                                        direction="top"
                                        offset={[0, -35]}
                                        permanent
                                        className="station-tooltip"
                                    >
                                        {station.stationName}
                                    </Tooltip>

                                    {/* Popup on click */}
                                    <Popup>
                                        <strong>{station.stationName}</strong><br />
                                        {station.location.address}<br />
                                        🕒 {station.workingHours.openingAt} - {station.workingHours.closingAt}
                                        <Link to={`/viewstation/${station._id}`}>
                                        <button>Book Now</button>
                                        </Link>
                                    </Popup>
                                </Marker>
                            ))}

                        </MapContainer>

                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}

export default Stations; 