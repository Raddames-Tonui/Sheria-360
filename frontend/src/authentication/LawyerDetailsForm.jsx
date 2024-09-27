import React, { useState, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../context/AuthContext';
import { storage } from '../authentication/firebase';
import toast from 'react-hot-toast';
import { server_url } from "../../config.json";

const counties = [
    { name: 'Nairobi', number: 1 },
    { name: 'Mombasa', number: 2 },
    // Add other counties...
];

const areas = [
    { category: 'Commercial Law', areas: ['Banking & Finance', 'Real Estate', 'Intellectual Property'] },
    { category: 'Public Law', areas: ['Constitutional Law', 'Environmental Law', 'Administrative Law'] },
    { category: 'Private Law', areas: ['Family Law', 'Probate & Estate Administration', 'Employment Law'] },
    { category: 'Criminal Law', areas: ['Criminal Defense', 'Traffic Offenses', 'Anti-Corruption'] },
    { category: 'Specialized Areas', areas: ['Maritime Law', 'Aviation Law', 'Sports Law'] }
];

const LawyerDetailsForm = () => {
    const { token } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        workEmail: '',
        phone: '',
        expertise: '',
        experience: '',
        bio: '',
        location: '',
        profilePicture: null,
        lawFirm: '', // New field for law firm
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicture') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const generateFilename = (firstName, lastName, originalName) => {
        const safeFirstName = firstName.replace(/[^a-zA-Z0-9]/g, "_");
        const safeLastName = lastName.replace(/[^a-zA-Z0-9]/g, "_");
        const fileExtension = originalName.split('.').pop();
        return `${safeFirstName}_${safeLastName}.${fileExtension}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            let imageUrl = '';

            // Upload profile picture if selected
            if (formData.profilePicture) {
                const filename = generateFilename(formData.firstName, formData.lastName, formData.profilePicture.name);
                const imageRef = ref(storage, `lawyerProfilePictures/${token}/${filename}`);
                await uploadBytes(imageRef, formData.profilePicture);
                imageUrl = await getDownloadURL(imageRef);
            }

            const dataToSend = {
                ...formData,
                firebase_uid: token, // Use the token from AuthContext
                profilePicture: imageUrl, // Send the uploaded image URL
            };

            // Send the request to update lawyer details
            const response = await fetch(`${server_url}/api/lawyer/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use the token from AuthContext
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Failed to update lawyer details');
            }

            const responseData = await response.json();
            console.log(responseData);

            setSuccess(true);
            toast.success('Details updated successfully!');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200 p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Update Lawyer Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form Fields */}
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="Work Email"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <select
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Field</option>
                        {areas.map((area) =>
                            area.areas.map((subArea) => (
                                <option key={subArea} value={subArea}>{subArea}</option>
                            ))
                        )}
                    </select>

                    <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Experience"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Bio"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select County</option>
                        {counties.map((county) => (
                            <option key={county.number} value={county.name}>{county.name}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="lawFirm"
                        value={formData.lawFirm}
                        onChange={handleChange}
                        placeholder="Law Firm"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    
                    <input
                        type="file"
                        name="profilePicture"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">Details updated successfully!</p>}
                </form>
            </div>
        </div>
    );
};

export default LawyerDetailsForm;
