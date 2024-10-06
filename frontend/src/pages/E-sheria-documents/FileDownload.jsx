import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Adjust the import based on your AuthContext file location

const FileDownloadLink = ({ serverUrl, fileUrl }) => {
    const { token } = useContext(AuthContext); // Get the token from the AuthContext

    const handleDownload = async () => {
        if (!token) {
            console.error("Authorization token is missing");
            return; // Exit if no token is available
        }

        const encodedFileUrl = encodeURIComponent(fileUrl);
        const downloadUrl = `${serverUrl}/file/download?file_url=${encodedFileUrl}`;

        try {
            const response = await fetch(downloadUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the Authorization header
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${errorText}`);
            }

            // Create a blob from the response
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileUrl.split('/').pop(); // Use the file name from the URL
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // Clean up
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    return (
        <div className="flex justify-center">
            <button 
                onClick={handleDownload}
                className="mt-3 p-2 bg-lime-600 hover:bg-lime-700 text-white rounded"
            >
                Download File
            </button>
        </div>
    );
};

// Example usage
const ExampleComponent = () => {
    const serverUrl = "http://localhost:5555"; // Replace with your server URL
    const fileUrl = "https://firebasestorage.googleapis.com/v0/b/sheria-365.appspot.com/o/documents/The Constitution Of Kenya.pdf?alt=media&token=5469edec-13a2-477a-b984-e08c1a908e5a";

    return (
        <div>
            <h2 className="text-2xl text-center mb-4">File Download</h2>
            <FileDownloadLink serverUrl={serverUrl} fileUrl={fileUrl} />
        </div>
    );
};

export default ExampleComponent;
