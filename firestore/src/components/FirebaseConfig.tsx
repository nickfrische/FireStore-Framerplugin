import React, { useState } from 'react';
import { initializeFirebase, FirebaseConfig } from '../config/firebase';

export const FirebaseConfigPanel: React.FC = () => {
    const [config, setConfig] = useState<FirebaseConfig>({
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            initializeFirebase(config);
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to initialize Firebase');
            setSuccess(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Firebase Configuration</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <label htmlFor="apiKey">API Key:</label>
                    <input
                        type="text"
                        id="apiKey"
                        name="apiKey"
                        value={config.apiKey}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="authDomain">Auth Domain:</label>
                    <input
                        type="text"
                        id="authDomain"
                        name="authDomain"
                        value={config.authDomain}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="projectId">Project ID:</label>
                    <input
                        type="text"
                        id="projectId"
                        name="projectId"
                        value={config.projectId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="storageBucket">Storage Bucket:</label>
                    <input
                        type="text"
                        id="storageBucket"
                        name="storageBucket"
                        value={config.storageBucket}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="messagingSenderId">Messaging Sender ID:</label>
                    <input
                        type="text"
                        id="messagingSenderId"
                        name="messagingSenderId"
                        value={config.messagingSenderId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="appId">App ID:</label>
                    <input
                        type="text"
                        id="appId"
                        name="appId"
                        value={config.appId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" style={{ 
                    padding: '10px', 
                    backgroundColor: '#007AFF', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Initialize Firebase
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: '10px' }}>Firebase initialized successfully!</div>}
        </div>
    );
}; 