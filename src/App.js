import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import Coins from "./Components/Coins";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Exchanges from "./Components/Exchanges";
import CoinsDetails from "./Components/CoinsDetails";
import Footer from "./Components/Footer";



function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/exchanges" element={<Exchanges/>}/>
        <Route path="/coins/:id" element={<CoinsDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
