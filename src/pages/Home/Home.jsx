import React, { useEffect, useState } from 'react';
import Categories from '../../components/categories/Categories';
import { getProducts } from "../../apiServices/productsApi";
import HomePageTop from "../../components/HomeTop/Index"
import axios from 'axios';
import CategoryProducts from '../../components/categoryProducts/CategoryProducts';
import asyncErrors from '../../middleware/AsyncErrors';
import Cards from '../../components/3dproductcard/Cards';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const getCategories = asyncErrors(async () => {
      const { data } = await axios.get("/categories", { cancelToken: cancelToken.token });
      setCategories(data);
    });

    getCategories();


    const populateProducts = asyncErrors(async () => {
      const { data } = await getProducts({ cancelToken: cancelToken.token });
      setProducts(data);

    });

    populateProducts()

    return () => {
      cancelToken.cancel();
    }

  }, []);



  return (
    <>
      <HomePageTop products={products} />
      <Categories categories={categories} products={products} />
      {categories.map(category => <CategoryProducts category={category} key={category._id} />)}
      <Cards products={products} />
    </>
  )
}

export default Home