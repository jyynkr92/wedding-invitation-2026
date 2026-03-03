import type { LocationMethodType } from './location-method';

interface TabProps {
  active: LocationMethodType;
  icon: React.ReactNode;
  label: string;
  id: LocationMethodType;
  setActive: (tab: LocationMethodType) => void;
}

const Tab = ({ active, icon, label, id, setActive }: TabProps) => {
  return (
    <button
      onClick={() => setActive(id)}
      className={`flex shrink-0 items-center justify-center gap-2 py-1 text-xs rounded-lg transition-colors ${
        active === id ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'
      } ${id === 'subway' ? 'flex-5' : 'flex-4'}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Tab;
