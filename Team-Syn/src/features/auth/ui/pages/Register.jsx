import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { Sparkles, Mail, Lock, User } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.58c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.58-2.77c-.98.66-2.23 1.06-3.7 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Register = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    console.log('Register Data:', data);
  };

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white selection:bg-violet-500/30">
      {/* Left side / Image */}
      <div className="hidden lg:flex w-1/2 relative bg-black items-end p-12">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=2000&auto=format&fit=crop" 
            alt="Natural landscape" 
            className="object-cover w-full h-full opacity-50"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-[#09090b]/50 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-lg mb-8">
          <div className="flex items-center text-xs font-semibold tracking-wider text-violet-400 mb-6 uppercase">
            <Sparkles className="w-4 h-4 mr-2" />
            Embrace The Wild
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
            Start your journey naturally.
          </h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed font-light">
            Connect your world to the beauty of seamless design and raw intelligence. Experience the calm.
          </p>
          <div className="flex gap-12">
            <div>
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-gray-400 font-medium tracking-wide">Uptime SLA</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">ISO</div>
              <div className="text-sm text-gray-400 font-medium tracking-wide">27001 Certified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side / Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-violet-900/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
            <p className="text-gray-400 text-sm">Experience the future of collaborative data intelligence.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-violet-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full pl-11 pr-4 py-3 bg-[#111113] border border-[#27272a] rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-gray-600 text-white"
                />
              </div>
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-violet-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
                  })}
                  className="w-full pl-11 pr-4 py-3 bg-[#111113] border border-[#27272a] rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-gray-600 text-white"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-violet-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' }
                  })}
                  className="w-full pl-11 pr-4 py-3 bg-[#111113] border border-[#27272a] rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-gray-600 text-white tracking-widest"
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="terms"
                  {...register('terms', { required: true })}
                  className="w-4 h-4 rounded border-[#27272a] bg-[#111113] text-violet-600 focus:ring-violet-500 focus:ring-offset-[#09090b] accent-violet-600 transition-all cursor-pointer"
                />
              </div>
              <label htmlFor="terms" className="ml-3 text-sm text-gray-400 leading-tight">
                I agree to the <span className="text-white hover:text-violet-400 cursor-pointer transition-colors font-medium">Terms of Service</span> and <span className="text-white hover:text-violet-400 cursor-pointer transition-colors font-medium">Privacy Policy</span>.
              </label>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full py-3 bg-white text-black hover:bg-gray-100 rounded-xl font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-[#27272a]"></div>
            <span className="px-4 text-[11px] font-semibold text-gray-500 tracking-wider uppercase">Or continue with</span>
            <div className="flex-1 border-t border-[#27272a]"></div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button className="w-full flex items-center justify-center py-3 bg-transparent hover:bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] rounded-xl transition-all text-sm font-medium text-gray-300 active:scale-[0.98]">
              <GoogleIcon />
              Continue with Google
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-medium hover:text-violet-400 transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
