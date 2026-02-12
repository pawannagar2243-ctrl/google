import "./App.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Googlepage() {
  const [form, setForm] = useState({ search: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  
  const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition is not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = navigator.language || "en-US";

  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.start();

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    const updatedForm = { search: transcript };
    setForm(updatedForm);

    try {
 const res = await axios.post(
  "https://google-1-wwe3.onrender.com/searchData",
  form
);


      navigate("/searchpage", {
        state: {
          result: res.data.result,
          search: transcript,
        },
      });
    } catch (err) {
      console.log("Voice search error:", err);
    }
  };

  recognition.onerror = (event) => {
    console.error("Voice error:", event.error);
  };
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
  "https://google-1-wwe3.onrender.com/searchData",
  form
);


    navigate("/searchpage", {
      state: {
        result: res.data.result,
        search: form.search,
      },
    });

    setForm({ search: "" });
  } catch (err) {
    console.log("Error:", err);
  }
};



  return (
    <>
      <div className="nav">
		<p><a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox">    Gmail</a></p>
		<p><a href="https://www.google.com/imghp?hl=en&tab=ri&ogbl">Images</a></p>
		<Link to="https://labs.google.com/search?source=ntp"><p><i className='fa'>&#xf0c3;</i></p></Link>
		<Link to="https://www.google.co.in/intl/en/about/products?tab=rh"><p><i style={{fontSize:"18px"}}className="material-icons">&#xe5c3;</i></p></Link>
		<Link to="https://accounts.google.com/SignOutOptions?hl=en&continue=https://www.google.com%3Fhl%3Den-US&ec=GBRA8wE"><p><img src="IMG_20250309_161907[1].jpg"className="img1"/></p></Link>
	</div>
	
	  <div className="container">
	  
		<div className="logo1">
		<p> <span style={{color:"#4285F4"}}>G</span>
			<span style={{color:"#EA4335"}}>o</span>
			<span style={{color:"#FBBC05"}}>o</span>
			<span style={{color:"#4285F4"}}>g</span>
			<span style={{color:"#34A853"}}>l</span>
			<span style={{color:"#EA4335"}}>e</span>
		</p>
		 </div>
		 <form onSubmit={handleSubmit}>
		<div className="search-box ">
			<i className="fa">&#xf002;</i>
			<input 
			    type="text"
				className="fa"
				name="search"
				value={form.search} 
				onChange={handleChange} placeholder="Search Google or type a URL"
				required
				/>
				
			<div className="icon-gap">
				<i className="material-icons"onClick={startListening}style={{ cursor: "pointer" }}>&#xe029;</i>

				<i className="material-icons">&#xe3b4;</i>
			</div>
		</div>
		</form>
		<div className="shortcuts">
		<a className="a1" href="https://chatgpt.com/" target="_blank">
		    <div className="shortcut">
			  <div className="img">
				<img src="download.png"/>
			  </div>
				<span>ChatGPT</span>
		    </div></a>
			<a className="a1" href="https://www.youtube.com/"target="_blank">
			<div className="shortcut">
			  <div className="img">
				<img src="download (1).png"/>
			  </div>
			  <span>YouTube</span>
			</div></a>
			<a className="a1"href="https://accounts.google.com/signin/chrome/sync?ssp=1&continue=https%3A%2F%2Fwww.google.com%2F&theme=mn" target="_blank">
			<div className="shortcut">
				<div className="img">
					<img src="download (2).png"/>
				</div> 
				  <span>Google</span> 
				</div></a>
				<a className="a1" href="#">
				<div className="shortcut">
			  <div className="img">+</div>
			  <span>Add</span>
			</div></a>
		  </div>
	  </div>
    </>
  );
}

export default Googlepage;
