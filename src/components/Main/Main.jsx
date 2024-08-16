import React, { useEffect, useState } from "react";
import style from "./main.module.scss";
import Aside from "./Aside";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setLoading, saveProducts } from "../../store/productsSlice";

function Main({
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
  sort,
  setSort,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.products);

  useEffect(() => {
    async function fetchProducts() {
      let query = "https://headphones-server.onrender.com/products";

      const params = [];
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }
      if (params.length) {
        query += `?${params.join("&")}`;
      }
      try {
        dispatch(setLoading(true));
        const response = await fetch(query);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(saveProducts(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchProducts();
  }, [selectedBrand, selectedColor]);

  const sortedProducts = [...products].sort((p1, p2) => {
    if (sort === "cheap") {
      return p1.price - p2.price;
    }
    if (sort === "expensive") {
      return p2.price - p1.price;
    }
    return 0;
  });
  const handleBrandClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <section className={style.hero}>
        <div className={style.container}>
          <div className={style.par1}>
            / Start / Categories <br /> / Headphones and audio for gaming
          </div>
          <div className={style.par2}>
            Headphones AND AUDIO <br /> FOR GAMING
          </div>
        </div>
      </section>
      <div className={style.container}>
        <section className={style.par3}>
          <p>Filtered by:</p>
          <select
            name="price"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">none</option>
            <option value="cheap">cheap</option>
            <option value="expensive">expensive</option>
          </select>
        </section>
        <section className={style.products}>
          <Aside
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <div className={style.all}>
            {loading && <p>Loading...</p>}
            <ul className={style.products_wrapper}>
              {sortedProducts.map((product) => (
                <li key={product.id}>
                  <div className={style.ab}>
                    <img src={product.image_url} alt={product.name} />
                  </div>
                  <h2 onClick={() => handleBrandClick(product.id)}>
                    {product.brand_name}
                  </h2>
                  <p>{product.description}</p>
                  <ul
                    style={{
                      display: "flex",
                    }}
                  >
                    {product.color_options.map((color, index) => (
                      <li
                        key={index}
                        style={{
                          backgroundColor: color,
                          width: "25px",
                          height: "25px",
                          border: "1px solid",
                          borderRadius: "50%",
                        }}
                      ></li>
                    ))}
                  </ul>
                  <div>${product.price}</div>
                  <button>
                    <FaCartShopping />
                    <p>Add to cart</p>
                  </button>
                </li>
              ))}

              {products.length === 0 && !loading && (
                <p>No products found matching your criteria.</p>
              )}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;
