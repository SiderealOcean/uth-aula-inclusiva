export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-brand-900 text-lg">
          Aula Inclusiva HN
        </span>
        <span className="text-xs text-gray-500">
          Proyecto Final Integrador · UTH · MISC 2025-2026
        </span>
      </div>
    </header>
  );
}
