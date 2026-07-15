import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToHash from "./components/ScrollToHash";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Shirts from "./pages/Shirts";
import Pants from "./pages/Pants";
import TShirts from "./pages/TShirts";
import TrackPants from "./pages/TrackPants";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shirts" element={<Shirts />} />
        <Route path="/pants" element={<Pants />} />
        <Route path="/tshirts" element={<TShirts />} />
        <Route path="/track-pants" element={<TrackPants />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
