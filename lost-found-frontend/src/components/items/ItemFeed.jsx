import { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ItemCard from './ItemCard';
import ItemDetail from './ItemDetail';
import Pagination from './Pagination';
import Loader from '../common/Loader';
import { itemService } from '../../services/itemService';
import { useDebounce } from '../../hooks/useDebounce';
import toast from 'react-hot-toast';

const ItemFeed = ({ type = 'found' }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const itemsPerPage = 12;
  const debouncedSearch = useDebounce(searchQuery, 300);

  const categories = [
    'all', 
    'Electronics', 
    'Documents', 
    'Clothing', 
    'Books', 
    'Accessories', 
    'Keys',
    'Bags',
    'Others'
  ];

  useEffect(() => {
    fetchItems();
  }, [type, category]);

  useEffect(() => {
    filterItems();
  }, [items, debouncedSearch]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = category !== 'all' ? { category } : {};
      const response = type === 'found' 
        ? await itemService.getFoundItems(params)
        : await itemService.getLostItems(params);
      setItems(response.items || response);
    } catch (error) {
      toast.error('Failed to load items');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    if (!debouncedSearch) {
      setFilteredItems(items);
      return;
    }

    const query = debouncedSearch.toLowerCase();
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.location_found && item.location_found.toLowerCase().includes(query)) ||
      (item.location_lost && item.location_lost.toLowerCase().includes(query))
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {type === 'found' ? 'Found Items' : 'Lost Items'}
        </h1>
        <p className="text-gray-600">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items by title, description, category, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 md:hidden"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Category Filters */}
        <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setCurrentPage(1);
                }}
                className={`
                  px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors
                  ${category === cat 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {currentItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">
            {searchQuery 
              ? 'Try adjusting your search or filters' 
              : 'Be the first to report an item!'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentItems.map(item => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onClick={setSelectedItem} 
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetail 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)}
          onUpdate={fetchItems}
        />
      )}
    </div>
  );
};

export default ItemFeed;
