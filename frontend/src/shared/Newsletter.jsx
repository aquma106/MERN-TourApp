import React, { useState } from "react";
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
import { BASE_URL } from "../utils/config";
import { toast, ToastContainer } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      return toast.error("Please enter a valid email");
    }

    try {
      const res = await fetch(`${BASE_URL}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        setEmail(""); // Reset input field
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
     // alert("An error occurred. Please try again.");
     toast.error(error.message);
      
    }
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe to get useful traveling information.</h2>

              <div className="newsletter__input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="btn newsletter__btn"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
            </div>
            
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="Male Tourist" />
            </div>
          </Col>
        </Row>
        <ToastContainer/>
      </Container>
    </section>
  );
};

export default Newsletter;
