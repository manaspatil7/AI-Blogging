import React from 'react';
import { getCategoryInfo } from '../../utils/helpers';

interface CategoryHeaderProps {
  categoryId: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryId }) => {
  const categoryInfo = getCategoryInfo(categoryId);

  return (
    <div className="text-center py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {categoryInfo.name}
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {categoryInfo.description}
      </p>
    </div>
  );
};

export default CategoryHeader;