import React, { useState, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../context/AuthContext';
import { storage } from '../authentication/firebase';
import toast from 'react-hot-toast';
import { server_url } from "../../config.json";

const UserUpdateForm = () => {
    const { token } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        profilePicture: null,
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
                firebase_uid: token,
                profilePicture: imageUrl,
            };

            const response = await fetch(`${server_url}/user/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Failed to update details');
            }

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
        <div className="flex items-center justify-center p-4 bg-slate-100 h-[90vh]" >
            <div className="w-full max-w-lg bg-white border shadow-md p-6">
                <h2 className="text-3xl font-bold text-center text-lime-600 mb-6">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="firstName" className="mb-1 font-semibold">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="lastName" className="mb-1 font-semibold">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="phone" className="mb-1 font-semibold">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="profilePicture" className="mb-1 font-semibold">Profile Picture</label>
                        <input
                            type="file"
                            name="profilePicture"
                            accept="image/*"
                            onChange={handleChange}
                            className="border p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-lime-600 text-white p-2 hover:bg-lime-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Details'}
                    </button>

                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    {success && <div className="text-green-600 text-sm">Details updated successfully!</div>}
                </form>
            </div>
        </div>
    );
};

export default UserUpdateForm;
