import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getFirebaseInstance } from '../config/firebase';

interface FirestoreViewerProps {
    collectionPath: string;
    limit?: number;
}

export const FirestoreViewer: React.FC<FirestoreViewerProps> = ({ collectionPath, limit = 10 }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { firestore } = getFirebaseInstance();
                const querySnapshot = await getDocs(collection(firestore, collectionPath));
                const documents = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(documents.slice(0, limit));
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionPath, limit]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h3>Collection: {collectionPath}</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
                {data.map((item) => (
                    <div key={item.id} style={{ 
                        padding: '10px', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px' 
                    }}>
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
}; 