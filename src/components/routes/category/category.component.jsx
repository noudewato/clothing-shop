import React, { useContext, useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import "./category.styles.scss";
import { CategoriesContext } from "../../../contexts/category.context";
import ProductCard from "../../product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const { categories } = useContext(CategoriesContext);

  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [categories, category]);
  return (
    <Fragment>
      <h2 className="category-title">{category}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
