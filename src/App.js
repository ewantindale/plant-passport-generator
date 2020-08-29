import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";
import eu from "./images/eu.png";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");

  const generatePDF = (e) => {
    e.preventDefault();

    const doc = new jsPDF({ unit: "pt" });

    const DOCUMENT_WIDTH = 595.28;
    const DOCUMENT_HEIGHT = 841.89;

    const TILE_WIDTH = DOCUMENT_WIDTH / 2;
    const TILE_HEIGHT = DOCUMENT_HEIGHT / 8;

    for (let x = 0; x < 2; x += 1) {
      for (let y = 0; y < 8; y += 1) {
        doc.addImage(eu, "PNG", x * TILE_WIDTH, y * TILE_HEIGHT, 69, 45);
        doc.text("Plant Passport", x * TILE_WIDTH + 175, y * TILE_HEIGHT + 20);
        doc.text("A " + a, x * TILE_WIDTH + 10, y * TILE_HEIGHT + 60);
        doc.text("B " + b, x * TILE_WIDTH + 10, y * TILE_HEIGHT + 80);
        doc.text("C " + c, x * TILE_WIDTH + 210, y * TILE_HEIGHT + 60);
        doc.text("D " + d, x * TILE_WIDTH + 210, y * TILE_HEIGHT + 80);
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
          <label for="a">A </label>
          <input
            type="text"
            name="a"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />

          <label for="c">C </label>
          <input
            type="text"
            name="c"
            value={c}
            onChange={(e) => setC(e.target.value)}
          />
        </div>
        <div>
          <label for="b">B </label>
          <input
            type="text"
            name="b"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
          <label for="d">D </label>
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
    </div>
  );
}

export default App;
