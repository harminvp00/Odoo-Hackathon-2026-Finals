import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserStatus } from '../../api/admin.api';
import { useNavigate } from 'react-router-dom';
import { Search, User, Filter, Eye, Ban, CheckCircle } from 'lucide-react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('ALL'); // ALL, CUSTOMER, VENDOR
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, activeTab, searchTerm]);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        let result = users;

        // Tab Filter
        if (activeTab !== 'ALL') {
            result = result.filter(u =>
                u.UserRoles?.some(ur => ur.Role?.role_code === activeTab)
            );
        }

        // Search Filter
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(u =>
                (u.email && u.email.toLowerCase().includes(lowerTerm)) ||
                (u.CustomerProfile?.full_name && u.CustomerProfile.full_name.toLowerCase().includes(lowerTerm)) ||
                (u.VendorProfile?.company_name && u.VendorProfile.company_name.toLowerCase().includes(lowerTerm))
            );
        }

        setFilteredUsers(result);
    };

    const handleStatusUpdate = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
        if (window.confirm(`Are you sure you want to ${newStatus} this user?`)) {
            try {
                await updateUserStatus(userId, newStatus);
                // Optimistic update
                setUsers(users.map(u => u.user_id === userId ? { ...u, status: newStatus } : u));
            } catch (error) {
                alert("Failed to update status");
            }
        }
    };

    const getRoleBadge = (user) => {
        const role = user.UserRoles?.[0]?.Role?.role_code || 'USER';
        const colors = {
            'ADMIN': 'bg-purple-100 text-purple-800',
            'VENDOR': 'bg-blue-100 text-blue-800',
            'CUSTOMER': 'bg-green-100 text-green-800'
        };
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[role] || 'bg-gray-100'}`}>
                {role}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all users in your account including their name, role, email and status.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                    <div className="flex space-x-2 bg-white p-1 rounded-lg border border-gray-200">
                        {['ALL', 'CUSTOMER', 'VENDOR'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.charAt(0) + tab.slice(1).toLowerCase()}s
                            </button>
                        ))}
                    </div>

                    <div className="relative rounded-md shadow-sm w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="shadow overflow-hidden ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {loading ? (
                                            <tr><td colSpan="5" className="px-3 py-4 text-center">Loading...</td></tr>
                                        ) : filteredUsers.length === 0 ? (
                                            <tr><td colSpan="5" className="px-3 py-4 text-center text-gray-500">No users found</td></tr>
                                        ) : (
                                            filteredUsers.map((user) => (
                                                <tr key={user.user_id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                                                {(user.CustomerProfile?.full_name?.[0] || user.VendorProfile?.company_name?.[0] || user.email[0]).toUpperCase()}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="font-medium text-gray-900">
                                                                    {user.CustomerProfile?.full_name || user.VendorProfile?.company_name || 'N/A'}
                                                                </div>
                                                                <div className="text-gray-500">{user.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {getRoleBadge(user)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                            }`}>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {new Date(user.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-3">
                                                        <button
                                                            onClick={() => navigate(`/admin/users/${user.user_id}?type=${user.UserRoles?.[0]?.Role?.role_code}`)}
                                                            className="text-blue-600 hover:text-blue-900 flex items-center inline-flex"
                                                        >
                                                            <Eye size={16} className="mr-1" /> View
                                                        </button>
                                                        {user.UserRoles?.[0]?.Role?.role_code !== 'ADMIN' && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(user.user_id, user.status)}
                                                                className={`${user.status === 'ACTIVE' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} flex items-center inline-flex`}
                                                            >
                                                                {user.status === 'ACTIVE' ? (
                                                                    <><Ban size={16} className="mr-1" /> Block</>
                                                                ) : (
                                                                    <><CheckCircle size={16} className="mr-1" /> Activate</>
                                                                )}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
