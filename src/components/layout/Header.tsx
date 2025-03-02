import { MainNav } from '../navigation/MainNav';

export const Header = () => {
  return (
    <header className="p-8 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Johanna Lundström
          </h1>
          <p className="text-gray-600 mt-2 font-bold">
            Portfolio
          </p>
        </div>
        
        <MainNav />
      </div>
    </header>
  );
};
