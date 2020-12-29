import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";
import eu from "./images/eu.png";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState(localStorage.getItem("plant_passport_b") || "");
  const [c, setC] = useState("130975");
  const [d, setD] = useState("UK");

  const generatePDF = (e) => {
    e.preventDefault();

    localStorage.setItem("plant_passport_b", b);

    const doc = new jsPDF({ unit: "pt" });

    const DOCUMENT_WIDTH = 595.28;
    const DOCUMENT_HEIGHT = 841.89;

    const TILE_WIDTH = DOCUMENT_WIDTH / 2;
    const TILE_HEIGHT = DOCUMENT_HEIGHT / 8;

    for (let x = 0; x < 2; x += 1) {
      for (let y = 0; y < 8; y += 1) {
        // add EU flag
        // doc.addImage(eu, "PNG", x * TILE_WIDTH, y * TILE_HEIGHT, 69, 45);

        // draw title and letters in bold
        doc.setFont("Times", "bold");
        doc.text("UK Plant Passport", x * TILE_WIDTH + 175, y * TILE_HEIGHT + 20);
        doc.text("A ", x * TILE_WIDTH + 10, y * TILE_HEIGHT + 60);
        doc.text("B ", x * TILE_WIDTH + 10, y * TILE_HEIGHT + 80);
        doc.text("C ", x * TILE_WIDTH + 210, y * TILE_HEIGHT + 60);
        doc.text("D ", x * TILE_WIDTH + 210, y * TILE_HEIGHT + 80);

        // draw inputted values in regular
        doc.setFont("Times", "regular");
        doc.text(a, x * TILE_WIDTH + 25, y * TILE_HEIGHT + 60);
        doc.text(b, x * TILE_WIDTH + 25, y * TILE_HEIGHT + 80);
        doc.text(c, x * TILE_WIDTH + 225, y * TILE_HEIGHT + 60);
        doc.text(d, x * TILE_WIDTH + 225, y * TILE_HEIGHT + 80);
      }
    }

    doc.save();
  };

  return (
    <div className="App">
      <h1>Plant Passport Generator</h1>
      <h4>Enter the values you want and then click Generate PDF.</h4>

      <form onSubmit={generatePDF}>
        <div className="inputRow">
          <div className="inputField">
            <label htmlFor="a">A </label>
            <input
              type="text"
              name="a"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>
          <div className="inputField">
            <label htmlFor="c">C </label>
            <input
              type="text"
              name="c"
              value={c}
              onChange={(e) => setC(e.target.value)}
            />
          </div>
        </div>
        <div className="inputRow">
          <div className="inputField">
            <label htmlFor="b">B </label>
            <input
              type="text"
              name="b"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </div>
          <div className="inputField">
            <label htmlFor="d">D </label>
            <input
              type="text"
              name="d"
              value={d}
              onChange={(e) => setD(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="generateButton">
            Generate PDF
          </button>
        </div>
      </form>
      <span className="guideLink">
        Need help? Read the{" "}
        <a
          href="https://planthealthportal.defra.gov.uk/assets/uploads/Plant-Passport-Introductory-Guide.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Plant Passport Introductory Guide
        </a>
      </span>

      <div className="footer">
        Created by{" "}
        <a
          href="https://www.ewantindale.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ewan Tindale
        </a>
      </div>
    </div>
  );
}

export default App;
