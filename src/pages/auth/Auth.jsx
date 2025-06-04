import { useState } from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', loginData);
        alert('Login functionality would be implemented here!');
    };

    const handleRegisterClick = () => {
        alert('Registration functionality would be implemented here!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex items-center text-sm text-gray-600">
                    <Link to="/" className="hover:text-gray-900">HOME</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">ACCOUNT</span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* New Customer Section */}
                    <div className="bg-white p-8 border border-gray-200">
                        <h2 className="text-xl font-medium text-gray-900 mb-2">New Customer</h2>
                        <p className="text-sm text-gray-600 mb-4">Register Account</p>
                        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                            By creating an account you will be able to shop faster, be up to date
                            on an order's status, and keep track of the orders you have previously made.
                        </p>
                        <button
                            onClick={handleRegisterClick}
                            className="bg-black text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                        >
                            CONTINUE
                        </button>
                    </div>

                    {/* Returning Customer Section */}
                    <div className="bg-white p-8 border border-gray-200">
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Returning Customer</h2>
                        <p className="text-sm text-gray-600 mb-6">I am a returning customer</p>

                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                    className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                    className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 text-sm"
                                />
                            </div>

                            <div className="text-right">
                                <button
                                    type="button"
                                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                                >
                                    Forgot your password?
                                </button>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <button
                                    type="submit"
                                    className="bg-black text-white px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                                >
                                    SIGN IN
                                </button>
                                <span className="text-sm text-gray-600">or Return to Store</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;