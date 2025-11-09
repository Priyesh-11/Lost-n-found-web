import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Phone, CreditCard, Edit, Save, X } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authService.updateProfile(formData);
      updateUser(formData);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>
            {!editing && (
              <Button
                variant="primary"
                icon={Edit}
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enrollment Number (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enrollment Number
              </label>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 rounded-lg">
                <CreditCard size={20} className="text-gray-500" />
                <span className="text-gray-900">{user?.enrollment_number}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Enrollment number cannot be changed
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
                  <User size={20} className="text-gray-500" />
                  <span className="text-gray-900">{formData.name}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
                  <Mail size={20} className="text-gray-500" />
                  <span className="text-gray-900">{formData.email}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              {editing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
                  <Phone size={20} className="text-gray-500" />
                  <span className="text-gray-900">{formData.phone}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {editing && (
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  icon={X}
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Save}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
