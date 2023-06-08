import { useEffect, useState } from 'react'
import { Container, Filter, FilterContainer, FilterText, Option, Select, Title } from './Styles';
import Products from '../../components/products/Products';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { getProducts } from '../../apiServices/productsApi';
import asyncErrors from '../../middleware/AsyncErrors';

const ProductList = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('newest');
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const { id } = useParams();

    //get products
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        const populateProducts = asyncErrors(async () => {
            const { data } = await getProducts({ cancelToken: cancelToken.token })
            setProducts(data.filter(product => product.category._id === id));
        });
        populateProducts();


        return () => {
            cancelToken.cancel();
        }

    }, [id]);

    useEffect(() => {


        //available colors
        function getColors() {
            if (!products) return;
            const data = products.map(product => product.color);
            const colors = data.filter(c => c !== (null || undefined));

            //remove duplicate colors
            const filteredColors = [...new Set(colors)];

            setColors(filteredColors);
        }
        getColors();

        //available sizes
        function getSizes() {
            if (!products) return;

            const data = products.map(product => product.sizes);
            //merge sizes in each product to one array
            const mergeSizes = [].concat.apply([], data);

            const sizes = mergeSizes.map(product => product.size);
            //remove duplicate Sizes
            const filteredSizes = [...new Set(sizes)];

            setSizes(filteredSizes);
        }

        getSizes();
    }, [products])







    if (!products) return <p>Loading....</p>;
    return (
        <main>
            <Container>
                <FilterContainer>
                    <Filter>
                        <FilterText>Filter Products</FilterText>
                        {colors.length > 0 && <Select name='color' onChange={e => setFilters({ ...filters, color: e.currentTarget.value })}>
                            <Option value="">
                                color
                            </Option>
                            {colors.map(color => <Option key={color}>{color}</Option>)}
                        </Select>}
                        {sizes.length > 0 && <Select name='size' onChange={e => setFilters({ ...filters, size: e.currentTarget.value })}>
                            <Option value="">
                                size</Option>
                            {sizes.map(size => <Option key={size} value={size}>{size}</Option>)}

                        </Select>
                        }
                    </Filter>
                    <Filter>
                        <FilterText>Sort Products</FilterText>
                        <Select onChange={e => setSort(e.target.value)}>
                            <Option value='newest'>
                                Newest
                            </Option>
                            <Option value='asc'>Price (asc)</Option>
                            <Option value='dec'>Price (desc)</Option>
                        </Select>

                    </Filter>
                </FilterContainer>
                <Products sort={sort} filters={filters} path={path} products={products} />
            </Container>
        </main>

    )
}

export default ProductList;