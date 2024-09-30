import { useState } from 'react';

interface LocationAutocompleteProps {
  onLocationSelect: (location: string) => void;
}

const locations = [
  'Amman',
  'Irbid',
  'Zarqa',
  'Aqaba',
  'Madaba',
  'Salt',
  'Karak',
  'Tafila',
  'Ajloun',
  'Mafraq',
  'Jerash',
  'Russeifa',
  'Al-Jizah',
  'Al-Salt',
  'Al-Mafraq',
  'Ar-Ramtha',
];

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({ onLocationSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      const filtered = locations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleLocationSelect = (location: string) => {
    setInputValue(location);
    setFilteredLocations([]);
    onLocationSelect(location);
  };

  return (
    <div className="mb-4 relative">
      <label className="block font-semibold mb-1">Location</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
        placeholder="Enter location"
      />
      {filteredLocations.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl shadow-md max-h-60 overflow-y-auto">
          {filteredLocations.map((location) => (
            <li
              key={location}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleLocationSelect(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
