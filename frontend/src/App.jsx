import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Googlepage from "./Googlepage";
import Searchpage from "./Searchpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Googlepage />} />
        <Route path="/searchpage" element={<Searchpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
