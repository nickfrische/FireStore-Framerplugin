import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, limit as firestoreLimit } from 'firebase/firestore';
import { getFirebaseInstance } from '../config/firebase';

interface FirestoreViewerProps {
    collectionPath: string;
    limit?: number;
}

interface DocumentData {
    id: string;
    [key: string]: any;
}

export const FirestoreViewer: React.FC<FirestoreViewerProps> = ({ collectionPath, limit = 10 }) => {
    const [data, setData] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!collectionPath) {
                setError('Collection path is required');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                const { firestore } = getFirebaseInstance();
                const q = query(collection(firestore, collectionPath), firestoreLimit(limit));
                const querySnapshot = await getDocs(q);
                
                const documents = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setData(documents);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch data from Firestore');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionPath, limit]);

    if (loading) {
        return (
            <div style={{ 
                padding: '20px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '200px'
            }}>
                Loading data...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                padding: '20px', 
                color: 'red',
                backgroundColor: '#fff3f3',
                borderRadius: '4px',
                border: '1px solid #ffcdd2'
            }}>
                Error: {error}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div style={{ 
                padding: '20px', 
                textAlign: 'center',
                color: '#666'
            }}>
                No data found in collection: {collectionPath}
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h3>Collection: {collectionPath}</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
                {data.map((item) => (
                    <div 
                        key={item.id} 
                        style={{ 
                            padding: '15px', 
                            border: '1px solid #e0e0e0', 
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                    >
                        <pre style={{ 
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                        }}>
                            {JSON.stringify(item, null, 2)}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
}; 