
import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma'; 

interface CategoryProps {
  category: string;
  ads: any[]; 
}

const CategoryPage = ({ category, ads }: CategoryProps) => {
  return (
    <div>
      <h1>Ads in {category}</h1>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            <img src={ad.imageUrl} alt={ad.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params as { category: string };

  const ads = await prisma.ad.findMany({
    where: { category },
  });

  return {
    props: {
      category,
      ads,
    },
  };
};

export default CategoryPage;
