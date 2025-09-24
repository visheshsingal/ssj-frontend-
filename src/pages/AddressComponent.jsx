/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"; // icons

// Address Card Component
const AddressCard = ({ address, onEdit, onDelete }) => (
    <div className="relative border border-gray-700 rounded-xl p-5 mb-4 shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 flex flex-col gap-2 transition-all hover:shadow-2xl">
        <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold">
            {address.addressType}
            {address.isDefault && (
                <span className="ml-2 bg-green-600 text-white px-1 rounded-full text-[10px] font-bold">
                    Default
                </span>
            )}
        </span>
        <div className="text-gray-200 font-medium text-sm">
            {address.fullName} &nbsp;|&nbsp; {address.phoneNumber}
            {address.alternatePhoneNumber && ` / ${address.alternatePhoneNumber}`}
        </div>
        <div className="text-gray-400 text-sm">
            {address.streetAddress}, {address.landmark && `${address.landmark}, `}
            {address.locality}, {address.city}, {address.state}, {address.pincode}, {address.country}
        </div>
        <div className="flex gap-3 mt-3">
            <button
                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-all shadow-md"
                onClick={() => onEdit(address)}
            >
                <FiEdit2 /> 
            </button>
            <button
                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-all shadow-md"
                onClick={() => onDelete(address._id)}
            >
                <FiTrash2 /> 
            </button>
        </div>
    </div>
);

// Address Form Component
const AddressForm = ({ initial, onSave, onCancel }) => {
    const [form, setForm] = useState(
        initial || {
            fullName: "",
            phoneNumber: "",
            alternatePhoneNumber: "",
            pincode: "",
            streetAddress: "",
            landmark: "",
            locality: "",
            city: "",
            state: "",
            country: "India",
            addressType: "Home",
            isDefault: false,
        }
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-6 rounded-xl shadow-lg mb-6 text-gray-200 font-medium"
            onSubmit={handleSubmit}
        >
            <button
                type="button"
                className="mb-4 px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center gap-1 transition-all"
                onClick={onCancel}
            >
                ← Back
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <input
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    pattern="[0-9]{10}"
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <input
                    name="alternatePhoneNumber"
                    value={form.alternatePhoneNumber}
                    onChange={handleChange}
                    placeholder="Alternate Phone Number"
                    pattern="[0-9]{10}"
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <input
                    name="streetAddress"
                    value={form.streetAddress}
                    onChange={handleChange}
                    placeholder="Street Address"
                    required
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <input
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    placeholder="Landmark"
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <input
                    name="locality"
                    value={form.locality}
                    onChange={handleChange}
                    placeholder="Locality"
                    required
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400"
                />
                <select
                    name="addressType"
                    value={form.addressType}
                    onChange={handleChange}
                    className="border border-gray-600 p-2 rounded-lg bg-gray-900 text-gray-200"
                >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                </select>
                <label className="flex items-center gap-2 text-gray-200">
                    <input
                        type="checkbox"
                        name="isDefault"
                        checked={form.isDefault}
                        onChange={handleChange}
                    />
                    Set as Default
                </label>
            </div>
            <div className="flex gap-3 mt-6">
                <button
                    type="submit"
                    className="flex items-center gap-1 px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:scale-105 transition-all shadow-md"
                >
                    Save
                </button>
                <button
                    type="button"
                    className="px-5 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

// Main Address Component
const AddressComponent = () => {
    const { auth } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchAddresses = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/addresses`,
                    { headers: { Authorization: auth.token } }
                );
                setAddresses(res.data || []);
            } catch (err) {
                toast.error("Failed to fetch addresses");
            }
            setLoading(false);
        };
        fetchAddresses();
    }, [auth.token]);

    const handleSave = async (form) => {
        setLoading(true);
        try {
            if (editing) {
                await axios.put(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-address/${editing._id}`,
                    form,
                    { headers: { Authorization: auth.token } }
                );
                toast.success("Address updated!");
            } else {
                await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/add-address`,
                    form,
                    { headers: { Authorization: auth.token } }
                );
                toast.success("Address added!");
            }
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/addresses`,
                { headers: { Authorization: auth.token } }
            );
            setAddresses(res.data || []);
        } catch (err) {
            toast.error("Failed to save address");
        }
        setEditing(null);
        setShowForm(false);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/delete-address/${id}`,
                { headers: { Authorization: auth.token } }
            );
            setAddresses((prev) => prev.filter((addr) => addr._id !== id));
            toast.success("Address deleted!");
        } catch (err) {
            toast.error("Failed to delete address");
        }
        setLoading(false);
    };

    const handleEdit = (address) => {
        setEditing(address);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditing(null);
        setShowForm(true);
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Manage Addresses</h2>
            {loading && <div className="text-center py-4 text-gray-400">Loading...</div>}
            {!loading && (
                <>
                    {showForm ? (
                        <AddressForm
                            initial={editing}
                            onSave={handleSave}
                            onCancel={() => {
                                setShowForm(false);
                                setEditing(null);
                            }}
                        />
                    ) : (
                        <>
                            <button
                                className="mb-6 flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-all shadow-md"
                                onClick={handleAddNew}
                            >
                                <FiPlus /> Add New Address
                            </button>
                            {addresses.length === 0 ? (
                                <div className="text-gray-400">No addresses found.</div>
                            ) : (
                                addresses.map((address) => (
                                    <AddressCard
                                        key={address._id}
                                        address={address}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default AddressComponent;
