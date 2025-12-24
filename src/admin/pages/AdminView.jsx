import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import Footer from '../../components/Footer';
import { Tabs, TabItem, Card, Badge, Spinner } from 'flowbite-react';
import { motion } from 'framer-motion';
import { getVerifiedStationsAPI, updateStationStatusAPI, getAllUsersAPI, updateUserStatusAPI } from '../../services/allAPIs';
import { toast } from 'react-toastify';
import './AdminView.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 }
};

function AdminView() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.replace(/"/g, "")}`
      };
      try {
        const response = await getAllUsersAPI(reqHeader);
        if (response.status === 200) {
          setAllUsers(response.data);
        }
      } catch (err) {
        console.log("Error fetching users", err);
      }
    }
  };
  // 1. Fetch Stations where status is NOT PENDING
  const fetchVerifiedStations = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.replace(/"/g, "")}`
      };
      try {
        const response = await getVerifiedStationsAPI(reqHeader);
        if (response.status === 200) {
          setStations(response.data);
        }
      } catch (err) {
        toast.error("Error fetching station data");
      }
    }
    setLoading(false);
  };

  // 2. Suspend/Change Status Function
  const handleSuspend = async (id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.replace(/"/g, "")}`
    };
    try {
      // Suspending usually means moving back to PENDING or a SUSPENDED status
      const response = await updateStationStatusAPI(id, { status: "PENDING" }, reqHeader);
      if (response.status === 200) {
        toast.info("Station status updated");
        fetchVerifiedStations(); // Refresh list
      }
    } catch (err) {
      toast.error("Operation failed");
    }
  };


  // 2. Suspend/Change Status Function
  // AdminView.jsx
  const handleBlockUser = async (id, currentStatus) => {
    // Toggle logic: if ACTIVE, make it BLOCKED
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.replace(/"/g, "")}`
    };

    try {
      // Ensure you pass the ID and the Object { status: ... }
      const response = await updateUserStatusAPI(id, { status: newStatus }, reqHeader);
      if (response.status === 200) {
        toast.success("User status updated");
        fetchAllUsers(); // Refresh the list
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchVerifiedStations();
    fetchAllUsers();
  }, []);

  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar />
      <div className="admin-main-wrapper">
        <AdminHeader />
        <main className="admin-main-content">
          <h1 className="admin-page-title">Verified Resource Management</h1>

          <Tabs variant="pills" className="premium-tabs">
            <TabItem active title="Station List">
              {loading ? (
                <div className="flex justify-center p-10"><Spinner size="xl" /></div>
              ) : (
                <motion.div className="owner-grid" variants={containerVariants} initial="hidden" animate="show">
                  {stations.map(station => (
                    <motion.div key={station._id} className="owner-card-wrapper" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                      <Card className="owner-card-base">
                        <div className="card-header">
                          <h5 className="card-title">{station.stationName}</h5>
                          <Badge color={station.status === 'APPROVED' ? 'success' : 'failure'}>
                            {station.status}
                          </Badge>
                        </div>

                        <div className="card-details vertical">
                          {/* Displaying Populated Owner Details */}
                          <p><strong>Owner:</strong> {station.ownerId?.username || 'N/A'}</p>
                          <p><strong>Owner Email:</strong> {station.ownerId?.email || 'N/A'}</p>
                          <p><strong>Address:</strong> {station.location?.address}</p>
                        </div>

                        <div className="card-actions">
                          <button className="btn-suspend" onClick={() => handleSuspend(station._id)}>
                            <span> Suspend </span>
                          </button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabItem>

            {/* <TabItem title="Slot / Resource List">
              <motion.div
                className="slot-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {slots.map(slot => (
                  <motion.div
                    key={slot.id}
                    className="slot-card-wrapper"
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                  >
                    {
                      slots.status == "Approved" &&
                      <Card className="slot-card-base">
                        <div className="card-header">
                          <h5 className="slot-id">{slot.id}</h5>
                          <Badge className={`badge badge-${slot.status === 'Active' ? 'success' : 'failure'}`}>
                            {slot.status}
                          </Badge>
                        </div>

                        <div className="card-details">
                          <p><strong>Location:</strong> {slot.location}</p>
                          <p><strong>Usage:</strong> {slot.usage}</p>
                        </div>

                        <div className="card-actions">
                          <button class="btn-suspend">
                            <span> Suspend </span>
                          </button>

                        </div>
                      </Card>
                    }
                  </motion.div>
                ))}

              </motion.div>
            </TabItem> */}
            <TabItem title="Users List">
              {loading ? (
                <div className="flex justify-center p-10"><Spinner size="xl" /></div>
              ) : (
                <motion.div
                  className="owner-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {allUsers.length > 0 ? (
                    allUsers.map(user => (
                      <motion.div
                        key={user._id}
                        className="owner-card-wrapper"
                        variants={itemVariants}
                      >
                        <Card className="owner-card-base">
                          <div className="card-header">
                            <h5 className="card-title">{user.username}</h5>
                            <Badge color={user.status === 'ACTIVE' ? 'success' : 'failure'}>
                              {user.status}
                            </Badge>
                          </div>

                          <div className="card-details vertical">
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                          </div>

                          <div className="card-actions">
                            <button
                              onClick={() => handleBlockUser(user._id, user.status)} // Pass user.status here
                              className={user.status === "ACTIVE" ? "btn-suspend" : "btn-approve"}
                            >
                              <span> {user.status === "ACTIVE" ? "Block User" : "Unblock User"} </span>
                            </button>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-white opacity-50 text-center col-span-full">No users registered yet.</p>
                  )}
                </motion.div>
              )}
            </TabItem>
          </Tabs>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AdminView;
