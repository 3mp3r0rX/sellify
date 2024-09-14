// app/category/[category]/page.tsx
import AdsByCategory from '@/app/components/AdsByCategory';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const { category } = useParams(); // Get the category from the URL

  return (
    <div className="container mx-auto px-4 py-8">
      <AdsByCategory category={category} />
    </div>
  );
}
