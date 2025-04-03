import React, { useState } from 'react';
import { initializeFirebase, FirebaseConfig } from '../config/firebase';

interface FirebaseConfigPanelProps {
    onConfigured: () => void;
}

export const FirebaseConfigPanel: React.FC<FirebaseConfigPanelProps> = ({ onConfigured }) => {
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
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear any previous errors when user makes changes
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            // Validate required fields
            if (!config.apiKey || !config.projectId) {
                throw new Error('API Key and Project ID are required');
            }

            await initializeFirebase(config);
            setSuccess(true);
            onConfigured();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to initialize Firebase');
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Firebase Configuration</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <label htmlFor="apiKey">API Key: *</label>
                    <input
                        type="text"
                        id="apiKey"
                        name="apiKey"
                        value={config.apiKey}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
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
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="projectId">Project ID: *</label>
                    <input
                        type="text"
                        id="projectId"
                        name="projectId"
                        value={config.projectId}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                    />
                </div>
                <button 
                    type="submit" 
                    style={{ 
                        padding: '10px', 
                        backgroundColor: '#007AFF', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Initializing...' : 'Initialize Firebase'}
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: '10px' }}>Firebase initialized successfully!</div>}
        </div>
    );
}; 