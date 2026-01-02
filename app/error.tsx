'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Safely extract error message
  const getErrorMessage = () => {
    if (!error) return 'An unexpected error occurred';
    
    // If it's an Error object, use the message
    if (error instanceof Error) {
      return error.message || 'An unexpected error occurred';
    }
    
    // If it has a message property
    if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      return error.message;
    }
    
    // If it's a string, use it directly
    if (typeof error === 'string') {
      return error;
    }
    
    // Fallback for any other type
    return 'An unexpected error occurred';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-6">{getErrorMessage()}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

