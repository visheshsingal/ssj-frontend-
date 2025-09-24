import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import React from "react";
import { useAuth } from "../../context/auth"; // Adjust path as needed

// Delivery Agent Card (memoized)
const AgentCard = React.memo(({ agent, onEdit, onDelete, onViewOrders }) => (
    <div className="border border-gray-800 rounded-xl p-4 mb-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 shadow flex flex-col gap-2 text-gray-100">
        <div className="flex justify-between items-center">
            <div>
                <span className="font-bold text-lg text-indigo-300">{agent.name}</span>
                <span className="ml-2 text-gray-400">{agent.phone}</span>
            </div>
            <div className="flex gap-2">
                <button
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
                    onClick={() => onEdit(agent)}
                >
                    Edit
                </button>
                <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
                    onClick={() => onDelete(agent._id)}
                >
                    Delete
                </button>
                <button
                    className="px-3 py-1 bg-gray-800 text-indigo-200 rounded hover:bg-gray-700 transition-all"
                    onClick={() => onViewOrders(agent)}
                >
                    Orders
                </button>
            </div>
        </div>
        <div className="text-sm text-gray-400">Email: {agent.email}</div>
        <div className="text-sm text-gray-400">Address: {agent.address}</div>
        <div className="text-sm">
            Status:{" "}
            <span className={agent.isActive ? "text-green-400" : "text-red-400"}>
                {agent.isActive ? "Active" : "Inactive"}
            </span>
        </div>
    </div>
));

// Delivery Agent Form
const AgentForm = React.memo(({ initial, onSave, onCancel }) => {
    const [form, setForm] = useState(
        initial
            ? {
                  ...initial,
                  status: initial.isActive ? "Active" : "Inactive",
              }
            : {
                  name: "",
                  phone: "",
                  email: "",
                  address: "",
                  status: "Active",
              }
    );

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            // Convert status to isActive boolean for backend
            const payload = {
                ...form,
                isActive: form.status === "Active",
            };
            delete payload.status;
            onSave(payload);
        },
        [form, onSave]
    );

    return (
        <form className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-4 rounded-xl shadow border border-gray-800 mb-4 text-gray-100" onSubmit={handleSubmit}>
            <button
                type="button"
                className="mb-4 px-3 py-1 bg-gray-800 text-indigo-200 rounded hover:bg-gray-700 flex items-center transition-all"
                onClick={onCancel}
            >
                ← Back
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Agent Name"
                    required
                    className="border border-gray-700 p-2 rounded bg-gray-900 text-indigo-200"
                />
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                    className="border border-gray-700 p-2 rounded bg-gray-900 text-indigo-200"
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="border border-gray-700 p-2 rounded bg-gray-900 text-indigo-200"
                />
                <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="border border-gray-700 p-2 rounded bg-gray-900 text-indigo-200"
                />
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border border-gray-700 p-2 rounded bg-gray-900 text-indigo-200"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
                >
                    Save
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-700 text-indigo-200 rounded hover:bg-gray-800 transition-all"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
});

// Orders List for Agent (memoized)
const AgentOrders = React.memo(({ agent, orders, onBack }) => (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-4 rounded-xl shadow border border-gray-800 mb-4 text-gray-100">
        <button
            type="button"
            className="mb-4 px-3 py-1 bg-gray-800 text-indigo-200 rounded hover:bg-gray-700 flex items-center transition-all"
            onClick={onBack}
        >
            ← Back
        </button>
        <h3 className="text-xl font-bold mb-4 text-indigo-300">
            Orders for {agent.name}
        </h3>
        <div className="grid grid-cols-1 gap-4">
            {orders.length === 0 ? (
                <div className="text-gray-400">No orders found.</div>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="border border-gray-700 rounded p-3 bg-gray-900 text-gray-100">
                        <div className="flex justify-between">
                            <span className="font-semibold text-indigo-200">Order #{order._id}</span>
                            <span
                                className={`px-2 py-1 rounded text-xs ${
                                    order.status === "Pending"
                                        ? "bg-yellow-900 text-yellow-300"
                                        : order.status === "Delivered"
                                        ? "bg-green-900 text-green-300"
                                        : "bg-red-900 text-red-300"
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>
                        <div className="text-sm text-gray-400">
                            Customer: {order.customerName}
                        </div>
                        <div className="text-sm text-gray-400">
                            Total: ₹{order.total}
                        </div>
                        <div className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
));

// Mock Data
const MOCK_AGENTS = [
    {
        _id: "1",
        name: "Amit Kumar",
        phone: "9876543210",
        email: "amit@delivery.com",
        address: "123, MG Road, Delhi",
        status: "Active",
    },
    {
        _id: "2",
        name: "Priya Singh",
        phone: "9988776655",
        email: "priya@delivery.com",
        address: "45, Marine Drive, Mumbai",
        status: "Inactive",
    },
];

const MOCK_ORDERS = [
    {
        _id: "101",
        customerName: "Rahul Sharma",
        total: 1200,
        status: "Pending",
        createdAt: "2025-09-21T10:00:00.000Z",
    },
    {
        _id: "102",
        customerName: "Priya Singh",
        total: 800,
        status: "Delivered",
        createdAt: "2025-09-20T15:30:00.000Z",
    },
    {
        _id: "103",
        customerName: "Amit Kumar",
        total: 500,
        status: "Cancelled",
        createdAt: "2025-09-19T12:45:00.000Z",
    },
];

const Delivery = () => {
    const { auth } = useAuth();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [orders, setOrders] = useState([]);

    // Fetch agents from backend
    const fetchAgents = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/delivery-agent/`,
                { headers: { Authorization: auth?.token } }
            );
            setAgents(res.data.agents || []);
        } catch (err) {
            toast.error("Failed to fetch agents");
        }
        setLoading(false);
    }, [auth?.token]);

    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]);

    // Memoized agent list
    const memoizedAgents = useMemo(() => agents, [agents]);

    // Memoized handlers
    const handleEdit = useCallback((agent) => {
        setEditing(agent);
        setShowForm(true);
    }, []);

    const handleDelete = useCallback(async (id) => {
        setLoading(true);
        try {
            await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/delivery-agent/delete/${id}`,
                { headers: { Authorization: auth?.token } }
            );
            toast.success("Agent deleted!");
            await fetchAgents(); // Refetch after delete
        } catch (err) {
            toast.error("Failed to delete agent");
        }
        setLoading(false);
    }, [fetchAgents, auth?.token]);

    const handleAddNew = useCallback(() => {
        setEditing(null);
        setShowForm(true);
    }, []);

    const handleSave = useCallback(async (form) => {
        setLoading(true);
        try {
            if (editing) {
                await axios.put(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/delivery-agent/update/${editing._id}`,
                    form,
                    { headers: { Authorization: auth?.token } }
                );
                toast.success("Agent updated!");
            } else {
                await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/delivery-agent/create`,
                    form,
                    { headers: { Authorization: auth?.token } }
                );
                toast.success("Agent added!");
            }
            await fetchAgents(); // Refetch after add/edit
        } catch (err) {
            toast.error("Failed to save agent");
        }
        setEditing(null);
        setShowForm(false);
        setLoading(false);
    }, [editing, fetchAgents, auth?.token]);

    const handleViewOrders = useCallback(async (agent) => {
        setSelectedAgent(agent);
        setShowOrders(true);
        setLoading(true);
        try {
            // Uncomment for real API
            // const res = await axios.get(
            //     `${import.meta.env.VITE_SERVER_URL}/api/v1/admin/delivery-agent-orders/${agent._id}`,
            //     { headers: { Authorization: auth?.token } }
            // );
            // setOrders(res.data.orders);
            setOrders([]); // Replace with actual orders
        } catch (err) {
            toast.error("Failed to fetch orders");
        }
        setLoading(false);
    }, [auth?.token]);

    const handleBackOrders = useCallback(() => {
        setShowOrders(false);
        setSelectedAgent(null);
        setOrders([]);
    }, []);

    return (
        <div className=" mx-auto py-8 p-2 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">Manage Delivery Agents</h2>
            {loading && <div className="text-center py-4">Loading...</div>}
            {!loading && (
                <>
                    {showOrders ? (
                        <AgentOrders
                            agent={selectedAgent}
                            orders={orders}
                            onBack={handleBackOrders}
                        />
                    ) : showForm ? (
                        <AgentForm
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
                                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
                                onClick={handleAddNew}
                            >
                                + Add New Agent
                            </button>
                            {memoizedAgents.length === 0 ? (
                                <div className="text-gray-400">No agents found.</div>
                            ) : (
                                memoizedAgents.map((agent) => (
                                    <AgentCard
                                        key={agent._id}
                                        agent={agent}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onViewOrders={handleViewOrders}
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

export default Delivery;