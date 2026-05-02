const LoadingPlaceholder = ({ imageLoaded }) => {
  return (
    <>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500">📷</span>
        </div>
      )}
    </>
  );
};

export default LoadingPlaceholder;
