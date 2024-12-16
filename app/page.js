"use client";

import React, { useEffect, useRef, useState } from "react";
import h337 from "heatmap.js";

export default function  GFGHeatmap() {
  const heatmapContainer = useRef(null);
  const [problemData, setProblemData] = useState([
    { "date": "2024-01-01", "easy": 3, "medium": 2, "hard": 1 },
    { "date": "2024-01-02", "easy": 5, "medium": 3, "hard": 0 },
    { "date": "2024-01-03", "easy": 2, "medium": 2, "hard": 3 },
    { "date": "2024-01-04", "easy": 1, "medium": 1, "hard": 0 },
    { "date": "2024-01-05", "easy": 4, "medium": 1, "hard": 2 },
    { "date": "2024-01-06", "easy": 2, "medium": 3, "hard": 0 },
  ]);

  useEffect(() => {
    if (heatmapContainer.current) {
      const heatmapInstance = h337.create({
        container: heatmapContainer.current,
        radius: 50,
        maxOpacity: 0.6,
        minOpacity: 0.1,
      });

      const heatmapData = {
        max: 10,
        data: problemData.map((item, index) => ({
          x: (index + 1) * 100, // X-position on heatmap
          y: item.easy + item.medium + item.hard, // Value (aggregate)
          value: item.easy + item.medium + item.hard,
          date: item.date, // Store the date
        })),
      };

      heatmapInstance.setData(heatmapData);

      // Adding labels (dates and problem count)
      problemData.forEach((item, index) => {
        const label = document.createElement("div");
        label.style.position = "absolute";
        label.style.top = `${(item.easy + item.medium + item.hard) * 20}px`; // Adjust as needed
        label.style.left = `${(index + 1) * 100}px`; // Match the X-position
        label.style.fontSize = "12px";
        label.style.fontWeight = "bold";
        label.style.color = "black";
        label.innerText = `${item.date}\n(${item.easy + item.medium + item.hard} problems)`;

        heatmapContainer.current.appendChild(label);
      });
    }
  }, [problemData]);

  return (
    <div>
      <h1 className="text-center my-4 text-xl font-bold">GFG Heatmap</h1>
      <div
        ref={heatmapContainer}
        style={{
          width: "800px",
          height: "400px",
          margin: "0 auto",
          position: "relative",
          background: "#f4f4f4",
        }}
      ></div>
    </div>
  );
}
