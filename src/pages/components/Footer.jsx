import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/Footer.css";

function Footer() {
  return (
    <footer className="footer text-center text-white">
      <div className="container p-4 pb-0">
        <section>
          <p className="d-flex justify-content-center align-items-center">
            <a
              type="button"
              className="btn btn-outline-light btn-rounded"
              href="https://github.com/ncwjsp/car-analytics"
              target="_blank" // Correct target value
              rel="noopener noreferrer" // Security best practice
            >
              GitHub
            </a>
          </p>
        </section>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Created by Nueachai Wijitsopon
      </div>
    </footer>
  );
}

export default Footer;
