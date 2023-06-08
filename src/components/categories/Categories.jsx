import { useState, useEffect } from 'react';
import axios from 'axios';
import { HorizontalSLider, Wrapper, Container, Image, Info } from './CategoriesStyles';
import asyncErrors from '../../middleware/AsyncErrors';


const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        const populateCategories = asyncErrors(async () => {
            const { data } = await axios.get("/categories", { cancelToken: cancelToken.token });
            setCategories(data)
        });

        populateCategories();


        return () => {
            cancelToken.cancel();
        }

    }, []);





    return (
        <Wrapper>
            <h2>Categories</h2>
            <HorizontalSLider>
                {categories.map(category => <Category key={category._id} category={category} />)}
            </HorizontalSLider>
        </Wrapper>
    )
}

export default Categories;








export const Category = ({ category }) => {
    return (
        <Container to={`/category/${category._id}`}>
            <Image src={category.image} alt={category.name} />
            <Info>
                <small>{category.name}</small>
            </Info>
        </Container>

    )
}
