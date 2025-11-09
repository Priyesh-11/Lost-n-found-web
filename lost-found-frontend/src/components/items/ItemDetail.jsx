import { useState } from 'react';
import { MapPin, Calendar, User as UserIcon, Tag, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { claimService } from '../../services/claimService';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ItemDetail = ({ item, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [claiming, setClaiming] = useState(false);
  const [verificationDetails, setVerificationDetails] = useState('');
  const [showClaimForm, setShowClaimForm] = useState(false);

  const isOwner = user && item.user_id === user.id;
  const canClaim = !isOwner && item.status === 'available';

  const handleClaim = async () => {
    if (!verificationDetails.trim()) {
      toast.error('Please provide verification details');
      return;
    }

    if (verificationDetails.length < 20) {
      toast.error('Please provide more detailed verification information (at least 20 characters)');
      return;
    }

    try {
      setClaiming(true);
      await claimService.createClaim({
        item_id: item.id,
        verification_details: verificationDetails,
      });
      toast.success('Claim submitted successfully! The owner will review your request.');
      onUpdate?.();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to submit claim');
    } finally {
      setClaiming(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'success',
      claimed: 'warning',
      returned: 'gray',
    };
    return colors[status] || 'gray';
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Item Details" size="lg">
      <div className="space-y-6">
        {/* Image */}
        {item.image_url && (
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={item.image_url} 
              alt={item.title}
              className="w-full max-h-96 object-contain bg-gray-100"
            />
          </div>
        )}

        {/* Title and Status */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
            <Badge variant={getStatusColor(item.status)} size="md">
              {item.status.toUpperCase()}
            </Badge>
          </div>
          <Badge variant="primary" size="md">
            {item.category}
          </Badge>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
          <p className="text-gray-700 leading-relaxed">{item.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium text-gray-900">
                {item.location_found || item.location_lost}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="text-primary mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium text-gray-900">
                {format(new Date(item.date_found || item.date_lost), 'PPP')}
              </p>
            </div>
          </div>

          {item.how_found && (
            <div className="md:col-span-2 flex items-start gap-3">
              <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-gray-600">How it was found</p>
                <p className="font-medium text-gray-900">{item.how_found}</p>
              </div>
            </div>
          )}
        </div>

        {/* Claim Section */}
        {canClaim && !showClaimForm && (
          <div className="border-t pt-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setShowClaimForm(true)}
            >
              Claim This Item
            </Button>
          </div>
        )}

        {canClaim && showClaimForm && (
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg">
              <AlertCircle className="text-primary mt-0.5 flex-shrink-0" size={20} />
              <p className="text-sm text-gray-700">
                Please provide detailed information to verify that this item belongs to you.
                Include specific details that only the owner would know.
              </p>
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Verification Details *
              </label>
              <textarea
                value={verificationDetails}
                onChange={(e) => setVerificationDetails(e.target.value)}
                placeholder="Describe specific features, contents, or circumstances that prove this is your item. For example: color, brand, unique marks, where you lost it, what's inside, etc."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                {verificationDetails.length}/200 characters (minimum 20 required)
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={() => setShowClaimForm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={handleClaim}
                disabled={claiming || verificationDetails.length < 20}
              >
                {claiming ? 'Submitting...' : 'Submit Claim'}
              </Button>
            </div>
          </div>
        )}

        {isOwner && (
          <div className="border-t pt-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">
                This is your item. You'll be notified when someone claims it.
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ItemDetail;
