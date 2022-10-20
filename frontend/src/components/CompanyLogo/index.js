import React from "react";

import "./CompanyLogo.scss";

function CompanyLogo({ mode = "dark", size = "medium" }) {
  const logo_color = mode == "light" ? "white_text" : "text_dark_grey";

  return (
    <div className={`logo_title ${size}`}>
      <div className="text_secondary">Omni</div>
      <div className={logo_color}>Flight</div>
    </div>
  );
}

export default CompanyLogo;
