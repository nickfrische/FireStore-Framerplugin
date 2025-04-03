import { addPropertyControls, ControlType } from "framer"
import { FirebaseConfigPanel } from "./components/FirebaseConfig"
import { FirestoreViewer } from "./components/FirestoreViewer"
import { useState } from "react"

export default function App(props) {
    const [isConfigured, setIsConfigured] = useState(false)

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {!isConfigured ? (
                <FirebaseConfigPanel onConfigured={() => setIsConfigured(true)} />
            ) : (
                <FirestoreViewer collectionPath={props.collectionPath} limit={props.limit} />
            )}
        </div>
    )
}

addPropertyControls(App, {
    collectionPath: {
        type: ControlType.String,
        title: "Collection Path",
        defaultValue: "users"
    },
    limit: {
        type: ControlType.Number,
        title: "Limit",
        defaultValue: 10,
        min: 1,
        max: 100
    }
})
