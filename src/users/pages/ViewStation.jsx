import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import { getViewStation, makeBookingPaymentAPI, getBookedSlotsAPI } from '../../services/allAPIs';
import Header from "../components/Header";
import Footer from "../../components/Footer";
import "./ViewStation.css";

import { loadStripe } from '@stripe/stripe-js';
import { selectTheme } from "flowbite-react";

function ViewStation() {
  const { id } = useParams(); // ✅ get station id from URL 
  const [station, setStation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [selectedSocket, setSelectedSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bookedSlots, setBookedSlots] = useState([]);



  const makeBookingPayment = async (socketId, time) => {
    if (!time) {
      alert("Please select a time slot");
      return;
    }

    const stripe = await loadStripe(
      "pk_test_51T0r8Q3wqmY61braSI1xdhG04eANeP3oCS53EzJyJrVw0MrpsHI4AvJ066OnuUfN4AU41dTBkd2hEMwAnYGmb8Gx00zdw4qGUb"
    );

    const token = sessionStorage.getItem("token");
    if (!token) return;

    const reqHeader = {
      Authorization: `Bearer ${token.replace(/"/g, "")}`,
    };

    const reqBody = {
      stationId: station._id,
      socketId: socketId,
      date: new Date().toISOString().split("T")[0],
      bookTime: time,
    };

    try {
      const response = await makeBookingPaymentAPI(reqBody, reqHeader);

      // const sessionId = response.data.sessionId;

      // const result = await stripe.redirectToCheckout({
      //   sessionId: sessionId,
      // });

      console.log(response.data);

      if (response?.data?.url) {
        window.location.href = response.data.url;
      } else {
        console.error("Stripe URL missing");
      }



      // if (result.error) {
      //   console.error(result.error.message);
      // }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };


  useEffect(() => {
    const fetchBookedSlots = async () => {
      console.log(selectedSocket);
      
      if (!selectedSocket) return;

      const token = sessionStorage.getItem("token");
      if (!token) return;

      const reqHeader = {
        Authorization: `Bearer ${token.replace(/"/g, "")}`
      };

      const today = new Date().toISOString().split("T")[0];

      try {
        const result = await getBookedSlotsAPI(
          selectedSocket._id,
          today,
          reqHeader
        );

        console.log(result);
        

        if (result.status === 200) {
          setBookedSlots(result.data);
        }
        console.log(bookedSlots);
        
      } catch (err) {
        console.error("Error fetching booked slots:", err);
      }
    };

    fetchBookedSlots();
  }, [selectedSocket]);


  // ✅ Fetch station from backend
  useEffect(() => {
    const fetchStation = async () => {

      const token = sessionStorage.getItem("token");
      if (!token) return;

      const reqHeader = {
        Authorization: `Bearer ${token.replace(/"/g, "")}`
      };

      try {
        const result = await getViewStation(id, reqHeader);
        if (result.status === 200) {
          setStation(result.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching stations:", err);
      }
    };

    fetchStation();
  }, [id]);

  // ✅ Generate time slots based on working hours
  const generateSlots = () => {

  // if (!station?.workingHours || !selectedDate) return [];
  if (!station?.workingHours) return [];


  const slots = [];
  const start = parseInt(station.workingHours.openingAt.split(":")[0]);
  const end = parseInt(station.workingHours.closingAt.split(":")[0]);

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentHour = now.getHours();

  for (let i = start; i < end; i++) {

    const time = `${i}:00`;

    const isBooked =
      Array.isArray(bookedSlots) &&
      bookedSlots.some(
        booking => booking.bookTime === time
      );

    let isPastTime = false;

    // if (selectedDate === today) {
      if (i <= currentHour) {
        isPastTime = true;
      }
    // }

    // if (selectedDate < today) {
    //   isPastTime = true;
    // }

    slots.push({
      time,
      isBooked: isBooked || isPastTime
    });
  }

  return slots;
};



  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!station) return <h2 style={{ textAlign: "center" }}>Station not found</h2>;

  return (
    <div className="view-station-page">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="stations-header-wrapper"
      >
        <Header />
      </motion.div>

      <div className="view-station-container">

        {/* 🔥 STATION HERO */}
        <div className="station-hero-card">
          <div className="hero-content">
            <span className="premium-tag">Premium Station</span>
            <h1>{station.stationName}</h1>
            <p>📍 {station.location?.address}</p>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-label">Operating Hours</span>
              <span className="stat-value">
                {station.workingHours?.openingAt} -{" "}
                {station.workingHours?.closingAt}
              </span>
            </div>
          </div>
        </div>

        {/* 🔥 SOCKET LIST */}
        <section className="socket-selection">
          <h3 className="section-label">1. Select a Socket</h3>
          <div className="sockets-list">
            {station.sockets?.map((socket) => (
              <div
                key={socket._id}
                className={`socket-card ${selectedSocket?._id === socket._id ? "active" : ""
                  } ${socket.status === "Occupied" ? "disabled" : ""}`}
                onClick={() =>
                  socket.status !== "Occupied" && setSelectedSocket(socket)
                }
              >
                <div className="socket-icon">⚡</div>

                <div className="socket-info">
                  <span className="socket-type">{socket.connectorType}</span>
                  <span className="socket-power">{socket.powerType} </span>
                  <span className="socket-price"><span> ₹ </span>{socket.pricePerHour} <span>/ hr</span> </span>
                </div>

                <div
                  className={`status-dot ${socket.status?.toLowerCase()}`}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* 🔥 BOOKING GRID */}
        <AnimatePresence>
          {selectedSocket && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="booking-grid-section"
            >
              <h3 className="section-label">
                2. Booking Schedule for {selectedSocket.type}
              </h3>

              <div className="time-slots-wrapper">
                {generateSlots(selectedSocket._id).map((slot, idx) => (
                  <button
                    key={idx}
                    className={`time-slot-btn ${slot.isBooked ? "booked" : "free"
                      }`}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    <span className="slot-time">{slot.time}</span>
                    <span className="slot-status">
                      {slot.isBooked ? "Reserved" : "Available"}
                    </span>
                  </button>
                ))}
              </div>

              <button onClick={() => makeBookingPayment(selectedSocket._id, selectedTime)} className="confirm-booking-btn">
                Confirm Reservation
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default ViewStation;
