import React, { useState } from "react";
import axios from "axios";
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
  const [chartData, setChartData] = useState([]);

  const handlePredict = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        symbol: symbol
      });

      setLrPrediction(res.data.linear_regression);
      setKnnPrediction(res.data.knn);
     setChartData([...res.data.history]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#f5f7fa,#e4e8f0)"
    }}>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "600px",
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
            outline: "none"
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
            fontWeight: "bold"
          }}
        >
          Predict
        </motion.button>
        {/* <p>{JSON.stringify(chartData)}</p> */}

        {/* Graph */}
        {chartData.length > 0 && (
          <div style={{ width: "100%", height: 250, marginTop: "30px" }}>
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{fontSize : 10}} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip />
                <Line
                  type="natural"
                  dataKey="close"
                  stroke="#5a67d8"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Prediction Cards */}
        {lrPrediction && (
          <div style={{
            display: "flex",
            gap: "20px",
            marginTop: "25px"
          }}>

            <div style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              background: "#f7f8fc",
              textAlign: "center"
            }}>
              <h4>📈 Linear Regression</h4>
              <h2>${lrPrediction.toFixed(2)}</h2>
            </div>

            <div style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              background: "#f7f8fc",
              textAlign: "center"
            }}>
              <h4>🤖 KNN Prediction</h4>
              <h2>${knnPrediction.toFixed(2)}</h2>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}

export default StockPredictor;