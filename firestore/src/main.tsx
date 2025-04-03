import React, { ComponentType } from "react"
import ReactDOM from "react-dom/client"
import "framer-plugin/framer.css"
import { App } from "./App"
import "./App.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// Export the plugin
export default {
    id: "fstore",
    name: "Firestore",
    description: "Connect your Framer project to Firestore",
    component: App as ComponentType<any>
}
