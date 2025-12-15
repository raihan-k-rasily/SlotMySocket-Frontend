import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import Footer from '../../components/Footer';
import { Tabs, TabItem, Card, Badge, Button } from 'flowbite-react';
import { motion } from 'framer-motion';
import './AdminVerification.css';

/* ------------------ DUMMY DATA ------------------ */

const DUMMY_OWNERS = [
  { id: 101, name: 'Alice Smith', email: 'alice@example.com', status: 'Pending' },
  { id: 102, name: 'Bob Johnson', email: 'bob@example.com', status: 'Pending' },
  { id: 103, name: 'Charlie Day', email: 'charlie@example.com', status: 'Verified' }
];

const DUMMY_SLOTS = [
  { id: 'SLOT001', location: 'Main Street Station', status: 'Active', usage: '50%' },
  { id: 'SLOT002', location: 'West End Hub', status: 'Fault', usage: '0%' },
  { id: 'SLOT003', location: 'University Campus', status: 'Active', usage: '90%' }
];

/* ------------------ MOTION ------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 }
};

/* ------------------ COMPONENT ------------------ */

function AdminVerification() {
  const [owners] = useState(DUMMY_OWNERS);
  const [slots] = useState(DUMMY_SLOTS);

  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar />

      <div className="admin-main-wrapper">
        <AdminHeader />

        // AdminVerification.jsx

// ... (Rest of the component remains the same)

        <main className="admin-main-content">
          <h1 className="admin-page-title">Verification & Resource Status</h1>

          <Tabs variant="pills" className="premium-tabs">

            <TabItem active title="Owner Verification">
              <motion.div
                className="owner-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {owners.map(owner => (
                  <motion.div
                    key={owner.id}
                    className="owner-card-wrapper"
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                  >
                    <Card className="owner-card-base">
                      <div className="card-header">
                        <h5 className="card-title">{owner.name}</h5>
                        <Badge className={`badge badge-${owner.status === 'Pending' ? 'warning' : 'success'}`}>
                          {owner.status}
                        </Badge>
                      </div>

                      <div className="card-details">
                        <p><strong>ID:</strong> {owner.id}</p>
                        <p><strong>Email:</strong> {owner.email}</p>
                      </div>

                      {owner.status === 'Pending' && (
                        <div className="card-actions">
                          <Button size="xs" className="btn-view">View</Button>
                          <Button size="xs" className="btn-approve">Approve</Button>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabItem>

            <TabItem title="Slot / Resource Status">
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
                        <Button size="sm" className="btn-details">View Details</Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabItem>
          </Tabs>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AdminVerification;
