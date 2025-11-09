import { useState } from 'react';
import ItemFeed from '../components/items/ItemFeed';

const Feed = () => {
  const [feedType, setFeedType] = useState('found');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setFeedType('found')}
            className={`
              px-6 py-3 font-medium border-b-2 transition-colors
              ${feedType === 'found'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'}
            `}
          >
            Found Items
          </button>
          <button
            onClick={() => setFeedType('lost')}
            className={`
              px-6 py-3 font-medium border-b-2 transition-colors
              ${feedType === 'lost'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'}
            `}
          >
            Lost Items
          </button>
        </div>
      </div>
      
      <ItemFeed type={feedType} />
    </div>
  );
};

export default Feed;
