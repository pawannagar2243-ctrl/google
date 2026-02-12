import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./App.css";
function Searchpage() {
  const location = useLocation();
  const result = location.state?.result;
  const searchText = location.state?.search || "";
  const [search, setSearch] = useState(searchText);
  return (
    <div className="search-page">
      <div className="search-header">
        <Link to="/" className="a1">
          <p className="logo">
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
          </p>
        </Link>
		<div className="search-box ">
			<input type="text"className="fa"value={search}onChange={(e) => setSearch(e.target.value)}required/>
			<div className="icon-gap">
			<div style={{width:"30px",borderRight:"1px solid #474747"}}>
			 <i style={{fontSize:"20px",color:"#474747"}} className='fa'>&#xf00d;</i>
			</div>
			
				<i className="material-icons"style={{fontSize:"25px",color:"#474747"}}>&#xe029;</i>
				<i className="material-icons"style={{fontSize:"25px",color:"#474747"}}>&#xe3b4;</i>
				<i className="fa" style={{fontSize:"25px",color:"#474747"}}>&#xf002;</i>
			</div>
		</div>
	    <div className="nav">
			<Link to="https://labs.google.com/search?source=ntp"><p><i className='fa'style={{fontSize:""}}>&#xf0c3;</i></p></Link>
			<Link to="https://www.google.co.in/intl/en/about/products?tab=rh"><p><i style={{fontSize:"18px"}}className="material-icons">&#xe5c3;</i></p></Link>
			<Link to="https://accounts.google.com/SignOutOptions?hl=en&continue=https://www.google.com%3Fhl%3Den-US&ec=GBRA8wE"><p><img src="IMG_20250309_161907[1].jpg"className="img1"/></p></Link>
	    </div>
      </div>

      <div className="results-container">
        {!result && <p>No result found</p>}

        {result?.results?.map((item, index) => (
          <div key={index} className="search-item">
            <a href={item.url}rel="noreferrer"className="result-link">
              <div className="result-header">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=32`}alt="logo1"className="site-logo"
                />
                <span className="result-url">{item.url}</span>
              </div>

              <h3 className="result-title">{item.title}</h3>
            </a>

            <p className="result-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searchpage;
