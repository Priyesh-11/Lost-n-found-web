import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Search, Package, Users, Shield, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Search,
      title: 'Easy Search',
      description: 'Browse through found items with advanced filters and search functionality',
    },
    {
      icon: Package,
      title: 'Report Items',
      description: 'Quickly report lost or found items with detailed descriptions and images',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with fellow students to reunite lost items with their owners',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Protected authentication and verification process for safe transactions',
    },
  ];

  const stats = [
    { label: 'Items Recovered', value: '500+' },
    { label: 'Active Users', value: '1000+' },
    { label: 'Success Rate', value: '85%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Lost Something? Found Something?
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Campus-wide platform to reunite lost items with their rightful owners
            </p>
            
            {isAuthenticated ? (
              <div className="flex gap-4 justify-center">
                <Link to="/feed">
                  <Button variant="secondary" size="lg" icon={Search}>
                    Browse Items
                  </Button>
                </Link>
                <Link to="/report">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                    Report Item
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-4 justify-center">
                <Link to="/register">
                  <Button variant="secondary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and secure way to manage lost and found items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join our community and help make campus a better place
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg" icon={ArrowRight}>
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
