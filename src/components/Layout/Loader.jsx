export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="w-14 h-14 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-blue-700 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
