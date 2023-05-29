import React, { useContext } from "react";
import { CategoriesContext } from "../../../contexts/category.context";
import CategoryPreview from "../../category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <div className="shop-container">
      {Object.keys(categories).map((title) => {
        const product = categories[title];
        return <CategoryPreview key={title} title={title} product={product} />;
      })}
    </div>
  );
};

export default CategoriesPreview;
