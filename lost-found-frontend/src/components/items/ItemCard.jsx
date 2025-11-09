import { MapPin, Calendar, Tag, User as UserIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Badge from '../common/Badge';
import Card from '../common/Card';

const ItemCard = ({ item, onClick }) => {
  const getStatusVariant = (status) => {
    const variants = {
      available: 'success',
      claimed: 'warning',
      returned: 'gray',
    };
    return variants[status] || 'gray';
  };

  return (
    <Card onClick={() => onClick(item)} hoverable>
      {item.image_url && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={item.image_url} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={getStatusVariant(item.status)} size="sm">
              {item.status}
            </Badge>
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-primary flex-shrink-0" />
            <span className="truncate">{item.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary flex-shrink-0" />
            <span className="truncate">
              {item.location_found || item.location_lost}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary flex-shrink-0" />
            <span>
              {formatDistanceToNow(
                new Date(item.date_found || item.date_lost), 
                { addSuffix: true }
              )}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
