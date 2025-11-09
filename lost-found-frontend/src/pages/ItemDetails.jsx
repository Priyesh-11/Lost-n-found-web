import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemDetail from '../components/items/ItemDetail';
import Loader from '../components/common/Loader';
import { itemService } from '../services/itemService';
import toast from 'react-hot-toast';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await itemService.getItemById(id);
      setItem(response.item || response);
    } catch (error) {
      toast.error('Failed to load item details');
      navigate('/feed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!item) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ItemDetail
        item={item}
        onClose={() => navigate('/feed')}
        onUpdate={fetchItem}
      />
    </div>
  );
};

export default ItemDetails;
