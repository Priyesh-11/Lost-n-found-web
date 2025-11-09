const StatCard = ({ icon: Icon, label, value, color = 'primary', trend }) => {
  const colors = {
    primary: 'text-primary bg-blue-100',
    success: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    danger: 'text-red-600 bg-red-100',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-gray-500 mt-1">{trend}</p>
          )}
        </div>
        <div className={`p-4 rounded-full ${colors[color]}`}>
          <Icon size={32} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
