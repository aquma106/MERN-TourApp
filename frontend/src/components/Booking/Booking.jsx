import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const [paymentStatus, setPaymentStatus] = useState("");

  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    totalAmount: price * 1 + 10,
  });

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRazorpayPayment = async (e) => {
    e.preventDefault();

    if (!user || user === undefined || user === null) {
      setPaymentStatus("Please sign in first!");
      return;
    }

    const isScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!isScriptLoaded) {
      setPaymentStatus("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }

    try {
      // Create Razorpay Order
      const response = await fetch(`${BASE_URL}/booking/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalAmount: totalAmount  }), // Amount in paise
      });

      const data = await response.json();

      if (!data || !data.orderId) {
        setPaymentStatus("Failed to create Razorpay order. Please try again.");
        return;
      }

      const options = {
        key: "rzp_test_IUa83CdYBGUAFr", // Replace with your Razorpay key ID
        amount: data.amount,
        currency: data.currency,
        name: "Tour Booking",
        description: "Book your tour now!",
        order_id: data.orderId,
        handler: async (response) => {
          // Verify payment on the backend
          const verifyResponse = await fetch(`${BASE_URL}/booking/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const result = await verifyResponse.json();

          if (result.success) {
            setPaymentStatus("Payment successful!");
            // Save booking data
            try {
              const bookingData = { ...booking, totalAmount };
              const res = await fetch(`${BASE_URL}/booking`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(bookingData),
              });

              const bookingResult = await res.json();

              if (!res.ok) {
                setPaymentStatus(bookingResult.message);
                return;
              }

              navigate("/thank-you");
            } catch (error) {
              setPaymentStatus("Failed to save booking. Please try again.");
            }
          } else {
            setPaymentStatus("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: booking.fullName,
          email: user.email,
          contact: booking.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setPaymentStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i> {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleRazorpayPayment}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span>₹{price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>₹10</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>₹{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleRazorpayPayment}>
          Book Now
        </Button>
        {paymentStatus && (
          <p
            className="mt-2 text-center"
            style={{
              color: paymentStatus.includes("failed") || paymentStatus.includes("Error")
                ? "#dc3545"
                : "#28a745",
            }}
          >
            {paymentStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Booking;
