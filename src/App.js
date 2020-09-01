import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";
import eu from "./images/eu.png";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState(localStorage.getItem("plant_passport_b") || "");
  const [c, setC] = useState("");
  const [d, setD] = useState("");

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
        doc.addImage(eu, "PNG", x * TILE_WIDTH, y * TILE_HEIGHT, 69, 45);

        // draw title and letters in bold
        doc.setFont("Times", "bold");
        doc.text("Plant Passport", x * TILE_WIDTH + 175, y * TILE_HEIGHT + 20);
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
        <div>
          <label htmlFor="a">A </label>
          <input
            type="text"
            name="a"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />

          <label htmlFor="c">C </label>
          <input
            type="text"
            name="c"
            value={c}
            onChange={(e) => setC(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="b">B </label>
          <input
            type="text"
            name="b"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
          <label htmlFor="d">D </label>
          <input
            type="text"
            name="d"
            value={d}
            onChange={(e) => setD(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="generateButton">
            Generate PDF
          </button>
        </div>
      </form>
      <a
        href="https://planthealthportal.defra.gov.uk/assets/uploads/Plant-Passport-Introductory-Guide.pdf"
        style={{ marginTop: "5rem" }}
      >
        Plant Passport Introductory Guide
      </a>
    </div>
  );
}

export default App;
