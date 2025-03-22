import { useState } from 'react';

interface VideoInputProps {
  onSubmit: (url: string, startTime: number, endTime: number) => void;
}

export function VideoInput({ onSubmit }: VideoInputProps) {
  const [url, setUrl] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(60);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url, startTime, endTime);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Video Timer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube URL here"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time (seconds)
            </label>
            <input
              type="number"
              value={startTime}
              onChange={(e) => setStartTime(Number(e.target.value))}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time (seconds)
            </label>
            <input
              type="number"
              value={endTime}
              onChange={(e) => setEndTime(Number(e.target.value))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Timer
        </button>
      </form>
    </div>
  );
}