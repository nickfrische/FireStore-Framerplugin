import { addPropertyControls, ControlType } from "framer-plugin"
import { FirebaseConfigPanel } from "./components/FirebaseConfig"
import { FirestoreViewer } from "./components/FirestoreViewer"
import { useState } from "react"

interface Props {
    collectionPath: string;
    limit: number;
}

export function App({ collectionPath = "users", limit = 10 }: Props) {
    const [isConfigured, setIsConfigured] = useState(false)

    return (
        <div style={{ width: "100%", height: "100%", background: "white" }}>
            {!isConfigured ? (
                <FirebaseConfigPanel onConfigured={() => setIsConfigured(true)} />
            ) : (
                <FirestoreViewer collectionPath={collectionPath} limit={limit} />
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
        max: 100,
        step: 1
    }
})
