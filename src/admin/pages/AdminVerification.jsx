import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import Footer from '../../components/Footer';
import { Tabs, TabItem, Card, Badge, Button, Spinner } from 'flowbite-react';
import { motion } from 'framer-motion';
import { getPendingStationsAPI, updateStationStatusAPI } from '../../services/allAPIs'; // Import your API
import { toast } from 'react-toastify';
import './AdminVerification.css';


const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function AdminVerification() {
  const [pendingStations, setPendingStations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Real Data from Backend
  const fetchPendingStations = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    
    if (token) {
      const updatedToken = token.replace(/"/g, "");
      const reqHeader = {
        "Authorization": `Bearer ${updatedToken}`
      };

      try {
        const response = await getPendingStationsAPI(reqHeader);
        if (response.status === 200) {
          setPendingStations(response.data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load pending requests");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingStations();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const updatedToken = token.replace(/"/g, "");
        const reqHeader = {
            "Authorization": `Bearer ${updatedToken}`
        };

        try {
            // Send the status update to the backend
            const response = await updateStationStatusAPI(id, { status: newStatus }, reqHeader);

            if (response.status === 200) {
                toast.success(`Station ${newStatus === 'APPROVED' ? 'Accepted' : 'Rejected'}`);
                
                // Refresh the list immediately so the card disappears
                fetchPendingStations(); 
            }
        } catch (error) {
            console.error("Status Update Error:", error);
            toast.error("Failed to update station status");
        }
    }
};

  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar />
      <div className="admin-main-wrapper">
        <AdminHeader />

        <main className="admin-main-content">
          <h1 className="admin-page-title">Verification Hub</h1>

          <Tabs variant="pills" className="premium-tabs">
            <TabItem active title="Station Requests">
              {loading ? (
                <div className="flex justify-center p-10"><Spinner size="xl" /></div>
              ) : (
                <motion.div 
                  className="owner-grid" 
                  variants={containerVariants} 
                  initial="hidden" 
                  animate="show"
                >
                  {pendingStations.length > 0 ? (
                    pendingStations.map((station) => (
                      <motion.div key={station._id} className="owner-card-wrapper" variants={itemVariants}>
                        <Card className="owner-card-base">
                          <div className="card-header">
                            <h5 className="card-title">{station.stationName}</h5>
                            <Badge className="badge badge-warning">PENDING</Badge>
                          </div>

                          <div className="card-details vertical">
                            {/* Accessing populated ownerId data */}
                            <p><strong>Owner:</strong> {station.ownerId?.username || 'Unknown'}</p>
                            <p><strong>Email:</strong> {station.ownerId?.email || 'N/A'}</p>
                            <p><strong>Location:</strong> {station.location?.address || 'View on Map'}</p>
                          </div>

                          <div className="card-actions">
                            <Button size="xs" className="btn-accept" 
                            onClick={() => handleStatusUpdate(station._id, 'APPROVED')}>Accept</Button>
                            <Button size="xs" className="btn-reject"
                            onClick={() => handleStatusUpdate(station._id, 'REJECTED')}><span>Reject</span></Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-white text-center col-span-full opacity-50">No pending requests found.</p>
                  )}
                </motion.div>
              )}
            </TabItem>

            {/* <TabItem title="Live Status">
                <p className="text-gray-400">Approved stations will appear here.</p>
            </TabItem> */}
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminVerification;