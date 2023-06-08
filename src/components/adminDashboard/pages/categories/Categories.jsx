import { CancelSharp, Delete, Edit, PublishOutlined, SendOutlined } from '@material-ui/icons';
import axios from 'axios';
import Joi from "joi-browser";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import logger from '../../../../apiServices/logger';
import { createCategory, createGenre, deleteCategory, deleteGenre, getCategories, getGenres, updateCategory, updateGenre } from '../../../../apiServices/productsApi';
import asyncErrors from '../../../../middleware/AsyncErrors';
import { uploadImage } from '../../Firebase';

const Container = styled.div`
flex: 80%;
background: pink;
height: auto;
width: 100%;
display: flex;
justify-content: space-around;
flex-wrap: wrap;
`

const Title = styled.h3`
text-align: center;
color: maroon;
font-weight: 400;
`;

const Wrapper = styled.section`
padding: 10px;
width: 270px;
position: relative;
border-radius: 20px;
border: 8px solid #223243;
box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
      5px 5px 15px rgba(0, 0, 0, 0.35),
      inset -5px -5px 15px rgba(255, 255, 255, 0.1),
      inset 5px 5px 15px rgba(0, 0, 0, 0.35);
margin: 10px;
`

const Article = styled.article`
        font-size: 1rem;
        font-weight: 400;
        text-transform:lowercase;
    display: flex;
    flex-direction: column;
`

const Modal = styled.form`
    position: absolute;
    top: 50%;
    left:50%;
    height: auto;
    width: 300px;
    transform:translate(-50%,-50%);
    padding: 40px;
    background-color: pink;
    user-select: none;
    border-radius: 20px;
    border: 8px solid #223243;
    box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
      5px 5px 15px rgba(0, 0, 0, 0.35),
      inset -5px -5px 15px rgba(255, 255, 255, 0.1),
      inset 5px 5px 15px rgba(0, 0, 0, 0.35);

      p{
        font-size: 13px;
      }

`
const Categories = () => {
    const [genres, setGenres] = useState([]);
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({ genreId: null, genre: "", category: "", image: "", categoryId: "" });
    const [errors, setErrors] = useState({ genre: "", category: "" });
    const [modal, openModal] = useState({ modal: null });


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        const populateCategories = asyncErrors(async () => {
            const { data: categories } = await getCategories({ cancelToken: cancelToken.token });
            setCategories(categories);
        });

        populateCategories();

        const populateGenres = asyncErrors(async () => {
            const { data: categories } = await getGenres({ cancelToken: cancelToken.token });
            setGenres(categories);
        });

        populateGenres();


        return () => {
            cancelToken.cancel();
        };

    }, []);


    const genreSchema = {
        genre: Joi.string().required().min(5).label("Genre"),
    };

    const categorySchema = {
        name: Joi.string().required().min(5).label("Category"),
        image: Joi.optional().label("Image"),
        genreId: Joi.string().label("Genre"),
        categoryId: Joi.string().label("Genre"),
    };

    const validate = (item, schema) => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(item, schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };


    const removeCategory = async (id) => {
        const originalCategories = [...categories];
        try {
            setCategories(originalCategories.filter(c => c._id !== id));
            await deleteCategory(id);

        } catch (error) {
            setCategories(originalCategories);
            logger.log(error)
        }
    };

    const removeGenre = async (id) => {
        const originalGenres = [...genres];

        try {
            setGenres(originalGenres.filter(c => c._id !== id));
            await deleteGenre(id);

        } catch (error) {
            setCategories(originalGenres);
            logger.log(error);

        }
    };

    const submitGenre = async (e) => {
        e.preventDefault();

        const error = validate({ genre: data.genre }, genreSchema);
        setErrors({ ...errors, genre: error ? error.genre : "" });

        if (error) return;

        // UPDATE 
        if (data.genreId) {
            try {
                // UI
                const genre = genres.find(g => g._id === data.genreId);
                genre._id = data.genreId;
                genre.name = data.genre;

                //api call
                await updateGenre({ name: data.genre }, data.genreId);

                closeModal();
                toast.success("success");


            } catch (error) {
                logger.log(error);
                setData({ ...data });
            }
        }
        //CREATE
        else {
            try {
                //API

                const { data: genre } = await createGenre({ name: data.genre });

                // UI
                setGenres([...genres, { name: genre.name, _id: genre._id }]);
                setData({ ...data, genre: "" });
                toast.success("success");

            } catch (error) {
                logger.log(error);
            }
        }
    };

    const openGenreModal = (genre) => {
        setData({ genre: genre.name, genreId: genre._id });
        openModal({ modal: "genre" });

    };

    const openCategoryModal = (category) => {
        setData({ categoryId: category._id, genreId: category.genre._id, image: category.image, category: category.name });
        openModal({ modal: "category" });

    };

    const submitCategory = async (e) => {
        e.preventDefault();

        const category = { name: data.category, image: data.image, genreId: data.genreId }

        const error = validate(category, categorySchema);

        setErrors({ ...errors, category: error ? (error.name || error.genreId || error.image) : "" });

        if (error) return;

        if (data.categoryId) {

            //update Ui
            const obj = categories.find(c => c._id === data.categoryId);
            obj.name = data.category;
            obj.image = data.image;
            obj.genreId = data.genreId;


            //update with new image
            if (data.image.name) {
                try {
                    const imageurl = uploadImage(data.image);
                    await updateCategory({ ...category, image: imageurl }, data.categoryId);
                    toast.success("success");

                } catch (error) {
                    logger.log(error);
                }

            } else {
                //update with existing image

                try {
                    await updateCategory(category, data.categoryId);
                    toast.success("success");


                } catch (error) {
                    logger.log(error);
                }

            };

            closeModal();

        }
        //NEW CATEGORY
        else {
            try {
                //api call
                const imageurl = uploadImage(data.image);
                const { data: item } = await createCategory({ ...category, image: imageurl });

                //update ui
                setCategories([...categories, { _id: item._id, name: item.name, image: item.image, genre: item.genre }]);

                setData({ ...data, category: "" });
                toast.success("success");


            } catch (error) {
                logger.log(error);
            }
        }

    };

    const closeModal = () => {
        openModal({ modal: "" });
        setData({ genreId: null, genre: "", category: "", image: "", categoryId: "" });

    }

    return (
        <Container>
            <Wrapper>
                <Title> Genres</Title>
                <Article >
                    <table className="table table-success table-sm table-bordered">

                        <thead>
                            <tr>
                                <th>Genre</th>
                                {(modal.modal !== "genre") && <th>Edit</th>}
                                {(modal.modal !== "genre") && <th>Delete</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {genres.map(genre =>
                                <tr key={genre._id}>
                                    <td>{genre.name}</td>
                                    {(modal.modal !== "genre") && <td>
                                        <Delete className='icon' onClick={() => removeGenre(genre._id)} />
                                    </td>}
                                    {(modal.modal !== "genre") && <td>
                                        <Edit className='icon' onClick={() => openGenreModal(genre)} />
                                    </td>}
                                </tr>)}
                        </tbody>

                    </table>
                    {(modal.modal !== "genre") && <button className='btn btn-sm btn-primary m-1' onClick={() => openModal({ modal: "genre" })}>Add genre</button>}
                </Article>
                {modal.modal === "genre" && <Input
                    closeModal={closeModal}
                    name="genre"
                    value={data.genre}
                    modal={modal}
                    errors={errors}
                    genre={data.genre}
                    data={data}
                    handleSubmit={submitGenre}
                    setData={setData} />}
            </Wrapper>
            <Wrapper>
                <Title> Categories</Title>
                <Article >
                    <table className="table table-secondary table-sm table-bordered">

                        <thead>
                            <tr>
                                <th>Category</th>
                                {(modal.modal !== "category") && <th>Edit</th>}
                                {(modal.modal !== "category") && <th>Delete</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map(category =>
                                <tr key={category._id}>
                                    <td>{category.name}</td>
                                    {(modal.modal !== "category") && <td>
                                        <Delete className='icon' onClick={() => removeCategory(category._id)} />
                                    </td>}
                                    {(modal.modal !== "category") && <td>
                                        <Edit className='icon' onClick={() => openCategoryModal(category)} />
                                    </td>}
                                </tr>)}
                        </tbody>

                    </table>
                    {modal.modal !== "category" && <button className='btn btn-sm btn-primary m-1' onClick={() => openModal({ modal: "category" })}>Add Category</button>}
                </Article>
                {modal.modal === "category" && <Input
                    closeModal={closeModal}
                    name="category"
                    value={data.category}
                    modal={modal}
                    data={data}
                    options={genres}
                    errors={errors}
                    category={data.category}
                    handleSubmit={submitCategory}
                    setData={setData} />
                }

            </Wrapper>

        </Container>
    )
}

export default Categories



const Input = ({ closeModal, name, value, setData, errors, handleSubmit, data, options }) => {
    return (
        <Modal className='form' onSubmit={handleSubmit}>
            <CancelSharp className="cancel icon" onClick={closeModal} />
            <Title>Add {name}</Title>
            <div className='d-flex justify-content-center align-content-center flex-direction-column'>
                <div className="form-group m-1">
                    <input
                        type="text"
                        value={value}
                        name={name}
                        onChange={(e) => setData({ ...data, [name]: e.target.value })}
                        className='form-control'
                    />
                    {name === "category" &&
                        <select className='m-2' name='size' onChange={e => setData({ ...data, genreId: e.currentTarget.value })}>
                            <option value="">genres</option>
                            {options.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
                        </select>
                    }

                    {name === "category" && <div className="productUpload d-inline">
                        {data.image && <img src={data.image.name ? URL.createObjectURL(data.image) : data.image} alt={data.image} className="productUploadImg" />}
                        <label htmlFor="file" className='btn btn-sm btn-success'>
                            <small>{data.image ? "Update Image" : "Add Image"}</small><PublishOutlined />
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setData({ ...data, image: e.target.files[0] })} />
                    </div>}

                    {(errors && errors[name]) && <div className="alert alert-danger">{errors[name]}</div>}
                </div>
                <span className='m-1'>
                    <button className="btn btn-primary btn-sm"  >
                        <SendOutlined />
                    </button>
                </span>
            </div>
        </Modal>
    )
}
