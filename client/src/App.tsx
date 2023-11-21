import { Route, Routes } from "react-router-dom";
import {
  Adventure,
  AdventureDetail,
  Home,
  Profile,
  Reservation,
} from "./pages";
import { Footer, LoginModal, Navbar, RegisterModal } from "./components";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <LoginModal />
      <RegisterModal />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adventure/:city" element={<Adventure />} />
        <Route path="/adventure/detail/:id" element={<AdventureDetail />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/adventure/reservation" element={<Reservation />} />
      </Routes>
      <Footer />
      <Toaster toastOptions={{ position: "top-center", duration: 3000 }} />
    </div>
  );
};

export default App;
