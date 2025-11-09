import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

const loginSchema = z.object({
  enrollment_number: z.string()
    .min(5, 'Enrollment number must be at least 5 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Only alphanumeric characters allowed'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  
  const from = location.state?.from?.pathname || '/feed';

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      login(response.token);
      toast.success('Login successful! Welcome back.');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Login to access your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Enrollment Number"
          type="text"
          placeholder="Enter your enrollment number"
          icon={User}
          error={errors.enrollment_number?.message}
          {...register('enrollment_number')}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`
                w-full px-4 py-2.5 pl-10 pr-12
                border rounded-lg 
                focus:ring-2 focus:ring-primary focus:border-transparent
                transition-all duration-200
                ${errors.password ? 'border-red-500' : 'border-gray-300'}
              `}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-primary font-medium hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
