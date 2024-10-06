import React, { useState, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../context/AuthContext';
import { storage } from '../authentication/firebase';
import toast from 'react-hot-toast';
import { server_url } from "../../config.json";

const counties = [
    { name: "Mombasa", number: 1 },
    { name: "Kwale", number: 2 },
    { name: "Kilifi", number: 3 },
    { name: "Tana River", number: 4 },
    { name: "Lamu", number: 5 },
    { name: "Taita Taveta", number: 6 },
    { name: "Garissa", number: 7 },
    { name: "Wajir", number: 8 },
    { name: "Mandera", number: 9 },
    { name: "Marsabit", number: 10 },
    { name: "Isiolo", number: 11 },
    { name: "Meru", number: 12 },
    { name: "Tharaka-Nithi", number: 13 },
    { name: "Embu", number: 14 },
    { name: "Kitui", number: 15 },
    { name: "Machakos", number: 16 },
    { name: "Makueni", number: 17 },
    { name: "Nyandarua", number: 18 },
    { name: "Nyeri", number: 19 },
    { name: "Kirinyaga", number: 20 },
    { name: "Murang'a", number: 21 },
    { name: "Kiambu", number: 22 },
    { name: "Turkana", number: 23 },
    { name: "West Pokot", number: 24 },
    { name: "Samburu", number: 25 },
    { name: "Trans Nzoia", number: 26 },
    { name: "Uasin Gishu", number: 27 },
    { name: "Elgeyo Marakwet", number: 28 },
    { name: "Nandi", number: 29 },
    { name: "Baringo", number: 30 },
    { name: "Laikipia", number: 31 },
    { name: "Nakuru", number: 32 },
    { name: "Narok", number: 33 },
    { name: "Kajiado", number: 34 },
    { name: "Kericho", number: 35 },
    { name: "Bomet", number: 36 },
    { name: "Kakamega", number: 37 },
    { name: "Vihiga", number: 38 },
    { name: "Bungoma", number: 39 },
    { name: "Busia", number: 40 },
    { name: "Siaya", number: 41 },
    { name: "Kisumu", number: 42 },
    { name: "Homa Bay", number: 43 },
    { name: "Migori", number: 44 },
    { name: "Kisii", number: 45 },
    { name: "Nyamira", number: 46 },
    { name: "Nairobi", number: 47 },
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
        lawFirm: '',
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

            const response = await fetch(`${server_url}/api/lawyer/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
        <div className="flex items-center justify-center  bg-slate-100  p-4">
            <div className="w-full max-w-lg bg-white border shadow-md border-gray-300  p-6">
                <h2 className="text-3xl font-bold text-center text-lime-600 mb-6">Update Lawyer Details</h2>
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
                            <label htmlFor="expertise" className="mb-1 font-semibold">Area of Expertise</label>
                            <select
                                name="expertise"
                                value={formData.expertise}
                                onChange={handleChange}
                                className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            >
                                <option value="">Select Field</option>
                                {areas.map((area) =>
                                    area.areas.map((subArea) => (
                                        <option key={subArea} value={subArea}>{subArea}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="location" className="mb-1 font-semibold">County</label>
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            >
                                <option value="">Select County</option>
                                {counties.map((county) => (
                                    <option key={county.number} value={county.name}> {county.number}. {county.name}</option>
                                ))}
                            </select>
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

                        <div className="flex flex-col w-full">
                            <label htmlFor="experience" className="mb-1 font-semibold">Experience</label>
                            <input
                                type="text"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="Experience"
                                className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            />
                        </div>
                    </div>

                    <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="Work Email"
                        className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                        required
                    />

                    

                    <div className="flex flex-col w-full">
                        <label htmlFor="bio" className="mb-1 font-semibold">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="A brief bio about you"
                            className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="lawFirm" className="mb-1 font-semibold">Law Firm</label>
                        <input
                            type="text"
                            name="lawFirm"
                            value={formData.lawFirm}
                            onChange={handleChange}
                            placeholder="Law Firm"
                            className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
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

export default LawyerDetailsForm;
