import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Home, List, Notify } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
