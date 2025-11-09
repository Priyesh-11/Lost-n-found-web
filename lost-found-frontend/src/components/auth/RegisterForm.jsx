import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';
import { User, Mail, Phone, Lock, Eye, EyeOff, CreditCard } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  enrollment_number: z.string()
    .min(5, 'Enrollment number must be at least 5 characters')
    .max(20, 'Enrollment number must not exceed 20 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Only alphanumeric characters allowed'),
  email: z.string()
    .email('Invalid email address')
    .endsWith('.edu', 'Must use college email (.edu)'),
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await authService.register(registerData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Join the Lost & Found community</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          icon={User}
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Enrollment Number"
          type="text"
          placeholder="Enter your enrollment number"
          icon={CreditCard}
          error={errors.enrollment_number?.message}
          {...register('enrollment_number')}
        />

        <Input
          label="College Email"
          type="email"
          placeholder="your.name@college.edu"
          icon={Mail}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="10-digit mobile number"
          icon={Phone}
          error={errors.phone?.message}
          {...register('phone')}
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
              placeholder="Create a strong password"
              className={`
                w-full px-4 py-2.5 pl-10 pr-12
                border rounded-lg 
                focus:ring-2 focus:ring-primary focus:border-transparent
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              className={`
                w-full px-4 py-2.5 pl-10 pr-12
                border rounded-lg 
                focus:ring-2 focus:ring-primary focus:border-transparent
                ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}
              `}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-primary font-medium hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
