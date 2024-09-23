import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SaveData from "./SaveData/SaveData.tsx"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SaveData>
    <App />
    </SaveData>
    <ToastContainer />
  </StrictMode>
)
