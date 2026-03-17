import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function StockPredictor() {

  const [symbol, setSymbol] = useState("");
  const [lrPrediction, setLrPrediction] = useState(null);
  const [knnPrediction, setKnnPrediction] = useState(null);

  const data = [
    { day: "Mon", price: 120 },
    { day: "Tue", price: 125 },
    { day: "Wed", price: 123 },
    { day: "Thu", price: 130 },
    { day: "Fri", price: 128 },
  ];

  const handlePredict = () => {
    setLrPrediction(182.45);
    setKnnPrediction(181.72);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#f5f7fa,#e4e8f0)"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "500px",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }}
      >
        <h2>📈 Stock Price Predictor</h2>

        <input
          type="text"
          placeholder="Enter Stock Symbol (AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={{
            width: "90%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "15px"
          }}
        />

        <br /><br />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePredict}
          style={{
            padding: "12px 22px",
            background: "#5a67d8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            letterSpacing: "0.5px"
          }}
        >
          Predict
        </motion.button>

        {/* Chart */}

        <div style={{ width: "100%", height: 250, marginTop: "30px" }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#5a67d8"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Prediction Cards */}

        {lrPrediction && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "25px"
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "15px",
                borderRadius: "10px",
                background: "#f7f8fc",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
              }}
            >
              <h4>📈 Linear Regression</h4>
              <h2>${lrPrediction}</h2>
            </div>

            <div
              style={{
                flex: 1,
                padding: "15px",
                borderRadius: "10px",
                background: "#f7f8fc",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
              }}
            >
              <h4>KNN Prediction</h4>
              <h2>${knnPrediction}</h2>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default StockPredictor;