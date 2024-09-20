import Link from 'next/link';
import slugify from 'slugify'; 

interface Category {
  name: string;
  icon: string;
}

const categories: Category[] = [
  { name: 'Cars', icon: '🚗' },
  { name: 'Real Estate', icon: '🏠' },
  { name: 'Pets', icon: '🐶' },
  { name: 'Electronics', icon: '📱' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Jobs', icon: '💼' },
  { name: 'Furniture', icon: '🛋️' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Books', icon: '📚' },
  { name: 'Services', icon: '🛠️' },
  { name: 'Health & Beauty', icon: '💄' },
  { name: 'Toys', icon: '🧸' },
  { name: 'Groceries', icon: '🛒' },
  { name: 'Baby Products', icon: '👶' },
  { name: 'Music Instruments', icon: '🎸' },
  { name: 'Garden & Outdoor', icon: '🌳' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Movies & Games', icon: '🎮' },
  { name: 'Bikes', icon: '🚲' },
  { name: 'Art & Collectibles', icon: '🖼️' },
  { name: 'Home Appliances', icon: '🍳' },
  { name: 'Event Planning', icon: '🎉' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Cameras', icon: '📷' },
];

const CategoriesList = () => {
  return (
    <div className="bg-gray-100 shadow-sm py-2">
      <div className="container mx-auto px-4 overflow-x-auto whitespace-nowrap space-x-4">
        {categories.map((category) => (
          <Link key={category.name} href={`/category/${slugify(category.name)}`} legacyBehavior>
            <a className="inline-block text-center px-3 py-2 text-gray-800 hover:text-blue-600">
              <div className="text-2xl mb-1">{category.icon}</div>
              <span>{category.name}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
