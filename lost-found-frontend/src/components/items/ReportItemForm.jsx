import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';
import { itemService } from '../../services/itemService';
import Button from '../common/Button';
import Input from '../common/Input';
import toast from 'react-hot-toast';

const reportSchema = z.object({
  type: z.enum(['lost', 'found']),
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  category: z.string().min(1, 'Please select a category'),
  location: z.string()
    .min(3, 'Location must be at least 3 characters')
    .max(100, 'Location must not exceed 100 characters'),
  date: z.string(),
  how_found: z.string().max(200, 'Maximum 200 characters').optional(),
});

const ReportItemForm = () => {
  const navigate = useNavigate();
  const { uploadImage, uploading, preview, handleFileSelect, clearPreview } = useImageUpload();
  const [selectedFile, setSelectedFile] = useState(null);

  const categories = [
    'Electronics',
    'Documents',
    'Clothing',
    'Books',
    'Accessories',
    'Keys',
    'Bags',
    'Wallets',
    'ID Cards',
    'Others'
  ];

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      type: 'found',
      date: new Date().toISOString().split('T')[0],
    }
  });

  const itemType = watch('type');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleFileSelect(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = null;

      // Upload image if selected
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
        if (!imageUrl) {
          toast.error('Image upload failed. Please try again.');
          return;
        }
      }

      // Prepare payload
      const payload = {
        title: data.title,
        description: data.description,
        category: data.category,
        image_url: imageUrl,
        status: 'available',
      };

      // Add type-specific fields
      if (itemType === 'lost') {
        payload.location_lost = data.location;
        payload.date_lost = data.date;
      } else {
        payload.location_found = data.location;
        payload.date_found = data.date;
        if (data.how_found) {
          payload.how_found = data.how_found;
        }
      }

      // Submit to API
      if (itemType === 'lost') {
        await itemService.reportLostItem(payload);
      } else {
        await itemService.reportFoundItem(payload);
      }

      toast.success(`Item reported successfully!`);
      navigate('/feed');
    } catch (error) {
      console.error('Error reporting item:', error);
      toast.error(error.message || 'Failed to report item. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Report an Item</h2>
          <p className="text-gray-600">
            Help reunite lost items with their owners by providing detailed information
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Item Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What would you like to report? *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`
                flex items-center justify-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all
                ${itemType === 'found' ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              `}>
                <input
                  type="radio"
                  value="found"
                  {...register('type')}
                  className="w-4 h-4 text-primary"
                />
                <span className="font-medium">I Found Something</span>
              </label>
              
              <label className={`
                flex items-center justify-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all
                ${itemType === 'lost' ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              `}>
                <input
                  type="radio"
                  value="lost"
                  {...register('type')}
                  className="w-4 h-4 text-primary"
                />
                <span className="font-medium">I Lost Something</span>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Blue Nike Backpack, iPhone 13 Pro, Notebook"
              className={`
                w-full px-4 py-2.5 border rounded-lg 
                focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.title ? 'border-red-500' : 'border-gray-300'}
              `}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              className={`
                w-full px-4 py-2.5 border rounded-lg 
                focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.category ? 'border-red-500' : 'border-gray-300'}
              `}
              {...register('category')}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              rows={5}
              placeholder="Provide detailed description including color, brand, size, unique features, condition, etc."
              className={`
                w-full px-4 py-2.5 border rounded-lg 
                focus:ring-2 focus:ring-primary focus:border-transparent
                resize-none
                ${errors.description ? 'border-red-500' : 'border-gray-300'}
              `}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {watch('description')?.length || 0}/500 characters
            </p>
          </div>

          {/* Location and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location {itemType === 'found' ? 'Found' : 'Lost'} *
              </label>
              <input
                type="text"
                placeholder="e.g., Library 2nd Floor, Cafeteria, Parking Lot A"
                className={`
                  w-full px-4 py-2.5 border rounded-lg 
                  focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.location ? 'border-red-500' : 'border-gray-300'}
                `}
                {...register('location')}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date {itemType === 'found' ? 'Found' : 'Lost'} *
              </label>
              <input
                type="date"
                max={new Date().toISOString().split('T')[0]}
                className={`
                  w-full px-4 py-2.5 border rounded-lg 
                  focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.date ? 'border-red-500' : 'border-gray-300'}
                `}
                {...register('date')}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>
          </div>

          {/* How Found (conditional) */}
          {itemType === 'found' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did you find it? (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Found on a bench, Left in classroom, Handed by security"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                {...register('how_found')}
              />
              {errors.how_found && (
                <p className="text-red-500 text-sm mt-1">{errors.how_found.message}</p>
              )}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image (Optional but recommended)
            </label>
            
            {!preview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                <label className="cursor-pointer">
                  <Upload size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, JPEG or WebP (Max 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-300">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-96 object-contain bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => {
                    clearPreview();
                    setSelectedFile(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Info Alert */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="text-primary mt-0.5 flex-shrink-0" size={20} />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Tips for better results:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Provide as many details as possible</li>
                <li>Include unique identifying features</li>
                <li>Upload a clear photo if available</li>
                <li>Specify the exact location</li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => navigate('/feed')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={isSubmitting || uploading}
            >
              {isSubmitting || uploading ? 'Submitting...' : 'Report Item'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportItemForm;
