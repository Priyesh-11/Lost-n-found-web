import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { claimService } from '../../services/claimService';
import toast from 'react-hot-toast';

const ClaimsList = ({ claims, onUpdate }) => {
  const handleUpdateStatus = async (claimId, status) => {
    try {
      await claimService.updateClaimStatus(claimId, status);
      toast.success(`Claim ${status} successfully`);
      onUpdate();
    } catch (error) {
      toast.error('Failed to update claim');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { variant: 'warning', label: 'Pending' },
      approved: { variant: 'success', label: 'Approved' },
      rejected: { variant: 'danger', label: 'Rejected' },
    };
    return badges[status] || badges.pending;
  };

  if (claims.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Clock size={48} className="mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600">No claims yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {claims.map(claim => (
        <div key={claim.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {claim.item_title}
              </h3>
              <p className="text-sm text-gray-600">
                Claimed by: {claim.claimer_name}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(claim.claimed_at), 'PPP')}
              </p>
            </div>
            <Badge {...getStatusBadge(claim.status)} />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Verification Details:
            </p>
            <p className="text-sm text-gray-600">{claim.verification_details}</p>
          </div>

          {claim.status === 'pending' && (
            <div className="flex gap-3">
              <Button
                variant="success"
                size="sm"
                icon={CheckCircle}
                onClick={() => handleUpdateStatus(claim.id, 'approved')}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={XCircle}
                onClick={() => handleUpdateStatus(claim.id, 'rejected')}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClaimsList;
