import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

//  publishable key
const stripePublishableKey =
  "pk_test_51SUbgsLiL0Js2Cy2aK4u4zOgBaWutKmRrNZVZ1sVRaJxIA55fxnBj6iNh2Fs1DZM2IsQ...";

let stripePromise = null;

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://dev-tinder.org"
    : "http://localhost:7777");

const Premium = () => {
  const [loading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);

  // Initialize Stripe with error handling
  useEffect(() => {
    const initStripe = async () => {
      try {
        console.log("Loading Stripe...");
        stripePromise = await loadStripe(stripePublishableKey);
        console.log("Stripe loaded successfully:", !!stripePromise);
        setStripeError(null);
      } catch (error) {
        console.error("Error loading Stripe:", error);
        setStripeError(
          "Failed to load Stripe. Please check your internet connection."
        );
      }
    };

    initStripe();
  }, []);

  const handleCheckout = async (plan) => {
    if (stripeError) {
      alert("Stripe is not loaded. Please refresh the page.");
      return;
    }

    setLoading(true);

    try {
      console.log(`Creating checkout session for ${plan} plan...`);

      const response = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ plan }),
      });

      console.log("Response status:", response.status);

      if (response.status === 401) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Checkout error:", errorData);
        alert(errorData.error || "Failed to create payment session.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Checkout session created:", data);

      if (!data.url) {
        alert("Failed to create payment session.");
        setLoading(false);
        return;
      }

      console.log("Redirecting to:", data.url);
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="m-10">
      {stripeError && (
        <div className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{stripeError}</span>
        </div>
      )}

      <div className="flex w-full gap-4">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul className="text-left">
            <li>-Chat with other people</li>
            <li>-100 connection Requests per day</li>
            <li>-Blue Tick</li>
            <li>-3 Months</li>
          </ul>

          <button
            className="btn btn-secondary"
            onClick={() => handleCheckout("silver")}
            disabled={loading || !!stripeError}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              "Buy Silver"
            )}
          </button>
        </div>

        <div className="divider divider-horizontal">OR</div>

        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul className="text-left">
            <li>-Chat with other people</li>
            <li>-Infinite connection Requests per day</li>
            <li>-Blue Tick</li>
            <li>-6 months</li>
          </ul>

          <button
            className="btn btn-primary"
            onClick={() => handleCheckout("gold")}
            disabled={loading || !!stripeError}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              "Buy Gold"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
