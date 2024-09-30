'use client';
import Cookies from 'js-cookie'; 
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/UserContext'; 
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import { signIn } from 'next-auth/react'; 
import Link from 'next/link'; // Next.js Link

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserRole } = useUser(); 
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State for button loading

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); 
    return () => setLoading(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
        const res = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error('Login failed. Please check your credentials.');
        }

        const roleRes = await fetch('http://localhost:8080/api/user/role', {
            credentials: 'include',
        });

        if (!roleRes.ok) {
            throw new Error('Failed to retrieve user role.');
        }

        const roleData = await roleRes.json();
        setUserRole(roleData.role);
        
        Cookies.set('userSession', 'true', { expires: 7 });
        
        toast.success('Login successful!');
        router.push('/');

    } catch (error: any) {
        toast.error(error.message);
    } finally {
        setIsLoggingIn(false); // End login process
    }
};

  const handleGoogleLogin = () => {
    signIn('google'); // Trigger Google login
  };

  const handleFacebookLogin = () => {
    signIn('facebook'); // Trigger Facebook login
  };

  return (
    <>
      {loading ? (
        <Loading /> 
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link href="/forgetpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Sign-in button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoggingIn} // Disable button while logging in
                  className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoggingIn ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            {/* Google and Facebook login buttons */}
            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Sign in with Google
              </button>
              <button
                onClick={handleFacebookLogin}
                className="mt-2 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign in with Facebook
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
