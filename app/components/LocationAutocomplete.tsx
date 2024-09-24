'use client';

import { SetStateAction, useState } from 'react';

const locations = [
    'Amman',
    'Zarqa',
    'Irbid',
    'Russeifa',
    'Aqaba',
    'Mafraq',
    'Madaba',
    'Al-Salt',
    'Jerash',
    'Tafila',
    'Ma\'an',
    'Karak',
    'Ajloun',
    'Al-Ramtha',
    'Al-Quwaysimah',
    'Sahab',
    'Al-Jubaiha',
    'Al-Husn',
    'Ain Al-Basha',
    'Fuheis',
    'Bayt Yafa',
    'Shouneh Al-Janubiyya',
    'Deir Alla',
    'Azraq',
    'Al-Hashimiya',
    'Al-Dhulayl',
    'Al-Sukhnah',
    'Qatraneh',
    // Add more if needed
  ];
  

export default function LocationAutocomplete() {
  const [location, setLocation] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  const handleChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setLocation(value);
    
    if (value) {
      const filtered = locations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleSelect = (value: SetStateAction<string>) => {
    setLocation(value);
    setFilteredLocations([]);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Location</label>
      <div className="relative">
        <input
          type="text"
          value={location}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter location"
        />
        {filteredLocations.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl shadow-lg mt-1">
            {filteredLocations.map((loc, index) => (
              <li
                key={index}
                onClick={() => handleSelect(loc)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
              >
                {loc}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
