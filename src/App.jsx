import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import OtpForm from "./components/OtpForm";
import CourseList from "./components/CourseList";
import BrandingLogo from "./components/BrandingLogo";
import Batches from "./components/Batches";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/otp-form" />} />
        <Route path="/otp-form" element={<OtpForm />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/batches" element={<Batches />} />
      </Routes>
      <BrandingLogo />
    </Router>
  );
}

export default App;
