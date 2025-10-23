import React from 'react';
import { ViewAngle } from '../services/geminiService';

interface ViewSelectorProps {
  currentView: ViewAngle;
  onSelectView: (view: ViewAngle) => void;
  loadingStates?: Partial<Record<ViewAngle, boolean>>;
  cachedViews?: Partial<Record<ViewAngle, string>>;
}

const VIEWS: { id: ViewAngle; label: string }[] = [
  { id: 'front', label: 'Front View' },
  { id: 'side', label: 'Side View' },
  { id: 'back', label: 'Back View' },
];

const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView, onSelectView, loadingStates = {}, cachedViews = {} }) => {
  return (
    <div className="mt-4 w-full bg-gray-700/50 p-2 rounded-lg flex justify-center gap-2">
      {VIEWS.map((view) => {
        const isLoading = loadingStates[view.id] === true;
        const isAvailable = !!cachedViews[view.id];
        const isSelected = currentView === view.id;
        const isDisabled = isLoading || !isAvailable;

        return (
          <button
            key={view.id}
            onClick={() => onSelectView(view.id)}
            disabled={isDisabled}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 flex items-center justify-center gap-2 min-w-[120px] h-10 ${
              isSelected
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-600 text-gray-300'
            } ${!isDisabled && !isSelected ? 'hover:bg-gray-500' : ''
            } ${isLoading ? 'cursor-wait' : ''
            } ${!isAvailable && !isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white"></div>
            ) : (
              view.label
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ViewSelector;
