import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
// import { CategoryProvider } from "./contexts/CategoryContext.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        {/* <CategoryProvider> */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
        {/* </CategoryProvider> */}
    </AuthProvider>
);
