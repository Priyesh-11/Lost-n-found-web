import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import ClaimsList from '../components/dashboard/ClaimsList';
import Loader from '../components/common/Loader';
import { claimService } from '../services/claimService';
import toast from 'react-hot-toast';

const MyClaims = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState([]);
  const [activeTab, setActiveTab] = useState('made');

  useEffect(() => {
    fetchClaims();
  }, [activeTab]);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const response = activeTab === 'made'
        ? await claimService.getMyClaims()
        : await claimService.getClaimsForMyItems();
      setClaims(response.claims || response);
    } catch (error) {
      toast.error('Failed to load claims');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Claims</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('made')}
                className={`
                  px-6 py-4 font-medium transition-colors
                  ${activeTab === 'made'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                Claims I Made
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`
                  px-6 py-4 font-medium transition-colors
                  ${activeTab === 'received'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                Claims Received
              </button>
            </div>
          </div>

          <div className="p-6">
            <ClaimsList claims={claims} onUpdate={fetchClaims} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClaims;
