import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Package, FileCheck, Clock, TrendingUp } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import UserItems from '../components/dashboard/UserItems';
import ClaimsList from '../components/dashboard/ClaimsList';
import Loader from '../components/common/Loader';
import { itemService } from '../services/itemService';
import { claimService } from '../services/claimService';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userItems, setUserItems] = useState({ lost: [], found: [] });
  const [claims, setClaims] = useState({ made: [], received: [] });
  const [stats, setStats] = useState({
    totalItems: 0,
    lostItems: 0,
    foundItems: 0,
    pendingClaims: 0,
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [itemsResponse, madeClaimsResponse, receivedClaimsResponse] = await Promise.all([
        itemService.getMyItems(),
        claimService.getMyClaims(),
        claimService.getClaimsForMyItems(),
      ]);

      setUserItems(itemsResponse);
      setClaims({
        made: madeClaimsResponse.claims || madeClaimsResponse,
        received: receivedClaimsResponse.claims || receivedClaimsResponse,
      });

      // Calculate stats
      const totalLost = itemsResponse.lost?.length || 0;
      const totalFound = itemsResponse.found?.length || 0;
      const pending = (receivedClaimsResponse.claims || receivedClaimsResponse)
        .filter(claim => claim.status === 'pending').length;

      setStats({
        totalItems: totalLost + totalFound,
        lostItems: totalLost,
        foundItems: totalFound,
        pendingClaims: pending,
      });
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'found', label: 'Items I Found' },
    { id: 'lost', label: 'Items I Lost' },
    { id: 'claims-made', label: 'My Claims' },
    { id: 'claims-received', label: 'Claims Received' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your items and claims from your dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Package}
            label="Total Items"
            value={stats.totalItems}
            color="primary"
          />
          <StatCard
            icon={TrendingUp}
            label="Found Items"
            value={stats.foundItems}
            color="success"
          />
          <StatCard
            icon={FileCheck}
            label="Lost Items"
            value={stats.lostItems}
            color="warning"
          />
          <StatCard
            icon={Clock}
            label="Pending Claims"
            value={stats.pendingClaims}
            color="danger"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-6 py-4 font-medium whitespace-nowrap transition-colors
                    ${activeTab === tab.id
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-600 hover:text-gray-900'}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-600">
                      You have {stats.foundItems} found items and {stats.lostItems} lost items.
                      {stats.pendingClaims > 0 && (
                        <span className="text-primary font-medium">
                          {' '}You have {stats.pendingClaims} pending claim{stats.pendingClaims > 1 ? 's' : ''} to review.
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Found Items Tab */}
            {activeTab === 'found' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Items I Found ({userItems.found?.length || 0})
                </h2>
                <UserItems
                  items={userItems.found || []}
                  type="found"
                  onUpdate={fetchDashboardData}
                />
              </div>
            )}

            {/* Lost Items Tab */}
            {activeTab === 'lost' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Items I Lost ({userItems.lost?.length || 0})
                </h2>
                <UserItems
                  items={userItems.lost || []}
                  type="lost"
                  onUpdate={fetchDashboardData}
                />
              </div>
            )}

            {/* Claims Made Tab */}
            {activeTab === 'claims-made' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Claims I Made ({claims.made?.length || 0})
                </h2>
                <ClaimsList
                  claims={claims.made || []}
                  onUpdate={fetchDashboardData}
                />
              </div>
            )}

            {/* Claims Received Tab */}
            {activeTab === 'claims-received' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Claims Received ({claims.received?.length || 0})
                </h2>
                <ClaimsList
                  claims={claims.received || []}
                  onUpdate={fetchDashboardData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
