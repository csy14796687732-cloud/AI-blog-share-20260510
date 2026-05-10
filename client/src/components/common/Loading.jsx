import React from 'react';

export function LoadingSpinner({ size = 'md', text = '加载中...' }) {
  const sizeClasses = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className={`loading-spinner ${sizeClasses[size] || sizeClasses.md}`} />
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  );
}

export function LoadingSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4"
          style={{ width: `${70 + Math.random() * 30}%` }}
        />
      ))}
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" text="页面加载中..." />
    </div>
  );
}
