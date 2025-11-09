import { useState } from 'react';
import { Trash2, Edit, Eye } from 'lucide-react';
import ItemCard from '../items/ItemCard';
import ItemDetail from '../items/ItemDetail';
import Button from '../common/Button';
import { itemService } from '../../services/itemService';
import toast from 'react-hot-toast';

const UserItems = ({ items, type, onUpdate }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await itemService.deleteItem(itemId);
      toast.success('Item deleted successfully');
      onUpdate();
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No {type} items yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="relative group">
            <ItemCard item={item} onClick={setSelectedItem} />
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                icon={Trash2}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <ItemDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default UserItems;
