export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-16 text-center">
      <div className="max-w-xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">404</p>
        <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="text-base text-gray-600">
          The page you are looking for doesn't exist or may have been moved.
        </p>
      </div>
    </div>
  );
}
