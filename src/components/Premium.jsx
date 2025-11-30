import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SUbgsLiL0Js2Cy2aK4u4zOgBaWutKmRrNZVZ1sVRaJxIA55fxnBj6iNh2Fs1DZM2IsQ..."
);

const Premium = () => {
  const handleCheckout = async (plan) => {
    try {
      const stripe = await stripePromise;

      const response = await fetch(
        "http://localhost:7777/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This sends cookies
          body: JSON.stringify({ plan }),
        }
      );

      if (response.status === 401) {
        alert("Please login first");
        // Optionally redirect to login page
        // window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to create payment session.");
        return;
      }

      const data = await response.json();

      if (!data.url) {
        alert("Failed to create payment session.");
        return;
      }

      // Redirect to Stripe Checkout using the modern approach
      // Simply redirect to the checkout URL
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>-Chat with other people</li>
            <li>-100 connection Requests per day</li>
            <li>-Blue Tick</li>
            <li>3 Months</li>
          </ul>

          <button
            className="btn btn-secondary"
            onClick={() => handleCheckout("silver")}
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li>-Chat with other people</li>
            <li>-Infinite connection Requests per day</li>
            <li>-Blue Tick</li>
            <li>6 months</li>
          </ul>
          <button
            className="btn btn-primary"
            onClick={() => handleCheckout("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
