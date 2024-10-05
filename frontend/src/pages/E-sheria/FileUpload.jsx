import React, { useState, useContext } from 'react';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'; 
import toast from 'react-hot-toast';
import { storage } from '../../authentication/firebase'; 
import { AuthContext } from '../../context/AuthContext'; 
import {server_url} from "../../../config.json"

function FileUpload() {
    const { currentUser, token } = useContext(AuthContext);
    const [file, setFile] = useState(null); 
    const [progress, setProgress] = useState(0); 
    const [url, setUrl] = useState(""); 
    const [parentCategory, setParentCategory] = useState(""); 
    const [category, setCategory] = useState(""); 

    // Category list
    const categories = [
        {
            parent: "Affidavits",
            children: [
                "Companies",
                "Marriage",
                "Motor Vehicle",
                "Others",
                "Real Estate",
                "Travel"
            ]
        },
        {
            parent: "Companies",
            children: [
                "Deeds and Agreements",
                "Letters and Notices"
            ]
        },
        {
            parent: "Employment",
            children: [
                "Employee Letters",
                "Employer Letters",
                "Employment Contracts"
            ]
        },
        {
            parent: "Family",
            children: [
                "Change of Name",
                "Deeds and Agreement",
                "Letters and Notices",
                "Wills"
            ]
        },
        {
            parent: "Letters and Notices",
            children: [
                "Agency & Brokerage",
                "Companies",
                "Employment",
                "Finance & Credit",
                "Others",
                "Powers of Attorney",
                "Real Estate",
                "Travel"
            ]
        },
        {
            parent: "Library",
            children: [
                "Articles",
                "How To"
            ]
        },
        {
            parent: "Resource Library",
            children: [
                "Articles",
                "How To"
            ]
        },
        {
            parent: "Real Estate",
            children: [
                "Transfers",
                "Agreements",
                "Letters and Notices"
            ]
        }
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setFile(files[0]);
        } else if (name === "parentCategory") {
            setParentCategory(value);
            setCategory("");
        } else if (name === "category") {
            setCategory(value);
        }
    };

    const handleUploadFile = async () => {
        if (!file || !currentUser || !category) return; // Ensure all necessary data is present
    
        const storageRef = ref(storage, `documents/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                // console.error("Upload failed", error);
                toast.error("Upload failed, please try again.");
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setUrl(downloadURL);
    
                const payload = {
                    name: file.name,
                    url: downloadURL,
                    firebaseUid: currentUser.uid,
                    category: category,
                    parentCategory: parentCategory
                };
    
                // Log the payload being sent to the backend
                // console.log('Sending payload to backend:', payload);
    
                try {
                    const response = await fetch(`${server_url}/file/upload`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(payload),
                    });
    
                    // Check if the response is ok
                    if (!response.ok) {
                        const errorText = await response.text(); // Get the raw text response
                        let errorData;
    
                        try {
                            errorData = JSON.parse(errorText); // Try parsing it as JSON
                        } catch (err) {
                            throw new Error(errorText || 'Unexpected error occurred.');
                        }
    
                        throw new Error(errorData.error || 'Failed to save the file URL to the backend.');
                    }
    
                    const responseData = await response.json();
                    console.log('Backend response:', responseData);
                    toast.success("File URL and category saved successfully!");
    
                    // Clear inputs after successful upload
                    setFile(null);
                    setParentCategory('');
                    setCategory('');
                    setProgress(0); 
                } catch (error) {
                    // console.error('Error while sending to Flask backend:', error);
                    toast.error(`Error while sending to Flask backend!`);
                }
            }
        );
    };
    

    return (
        <div className="flex justify-center h-[90vh] bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md h-[70vh] mt-5">
                <h2 className='text-3xl text-center mb-10 text-lime-600 font-bold'>Upload Legal Document</h2>
    
                <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className='mb-8 w-full'
                />
    
                <select
                    name="parentCategory"
                    value={parentCategory}
                    onChange={handleChange}
                    className='border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500 mb-4 w-full'
                >
                    <option value="">Document Type</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat.parent}>{cat.parent}</option>
                    ))}
                </select>
    
                <div className="flex flex-col">
                    <label htmlFor="category" className="mb-1 font-semibold">Subcategory</label>
    
                    <select
                        name="category"
                        value={category}
                        onChange={handleChange}
                        className='border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500 mb-4 w-full'
                    >
                        <option value="">Subcategory</option>
                        {parentCategory && categories
                            .find(cat => cat.parent === parentCategory)
                            ?.children.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
    
                <button
                    onClick={handleUploadFile}
                    className='mt-3 p-2 bg-lime-600 hover:bg-lime-700 text-white w-full'
                >
                    Upload File
                </button>
    
                {progress > 0 && (
                    <div className="mt-2">
                        <progress value={progress} max="100" className="w-full"></progress>
                        <p>{Math.round(progress)}% uploaded</p>
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default FileUpload;