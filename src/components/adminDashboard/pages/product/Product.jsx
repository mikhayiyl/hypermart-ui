import Joi from "joi-browser";
import "./product.css";
import withRouter from "../../../../utilities/withRouter";
import Chart from "../../components/chart/Chart";
import { DeleteForeverOutlined, Publish } from "@material-ui/icons";
import axios from "axios";
import asyncErrors from '../../../../middleware/AsyncErrors';
import FormExtension from "../../../../Forms/FormExtention";
import { getCategories, getProduct, createProduct } from "../../../../apiServices/productsApi";
import { getGenres } from "../genres";
import removeEmptyValues from "../../../../utilities/RemoveKeys";
import { toast } from "react-toastify";
import { uploadImage } from "../../Firebase";
import logger from "../../../../apiServices/logger";


class Product extends FormExtension {
    state = {
        statistics: [],
        product: {},
        data: { image: '', title: "", description: "", numberInStock: "", color: "", price: "", size: "", sex: "", categoryId: "", },
        errors: {},
        genres: getGenres(),
        categories: [],
        sizes: [],
        file: null,
    };



    months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    cancelToken = axios.CancelToken.source();

    productId = this.props.params.id;

    schema = {
        _id: Joi.string(),
        image: Joi.optional().allow({} || "").label("Image"),
        title: Joi.string().required().min(3).label("Name"),
        numberInStock: Joi.number().required().min(1).label("Stock"),
        description: Joi.string().required().min(5).label("Description"),
        color: Joi.string().optional().allow('').label("Color"),
        price: Joi.number().optional().allow('').label("Price"),
        size: Joi.string().optional().allow('').label("Size"),
        sex: Joi.string().optional().allow('').label("Sex"),
        categoryId: Joi.string().required().min(24).label("Category"),
    };

    populateGenres() {
        const genres = getGenres();
        this.setState({ genres });
    }

    populateCategories = asyncErrors(async () => {
        const { data: categories } = await getCategories({ cancelToken: this.cancelToken.token });
        this.setState({ categories });
    });

    getStatistics = asyncErrors(async () => {
        const { data: stats } = await axios.get("/orders/income?productId=" + this.productId);

        const statistics = stats.map(item => [...this.state.statistics, { name: this.months[item._id - 1], Sales: item.total }]);
        this.setState({ statistics });
    });

    populateProduct = asyncErrors(async () => {

        if (this.productId === "new") return;

        const { data: product } = await getProduct(this.productId);

        this.setState({ data: this.mapToViewModel(product), sizes: this.viewSizes(product) });

    });






    componentDidMount() {
        this.populateGenres();
        this.populateCategories();
        this.populateProduct();
        this.getStatistics();
    }

    componentWillUnmount() {
        return () => {
            this.cancelToken.cancel();
        }
    }


    viewSizes(product) {
        return product.sizes

    }

    mapToViewModel(product) {

        const obj = {
            _id: product._id,
            categoryId: product.category._id,
            description: product.description,
            image: product.image,
            price: product.price,
            numberInStock: product.numberInStock,
            sex: product.sex,
            title: product.title,
        };

        if (product.color) obj.color = product.color;
        if (product.size) obj.size = product.size;

        return obj;

    }

    doSubmit = async (data) => {
        const obj = { ...data, sizes: this.state.sizes };
        removeEmptyValues(obj);
        console.log({ obj })




        if (data.image && data.image.name) {

            try {


                const imageUrl = uploadImage(data.image);

                await createProduct({ ...obj, image: imageUrl });

                toast.info('success');

                window.location.replace("/admin/products");
            } catch (ex) {
                logger.log(ex);
            }

        } else {
            try {
                await createProduct(obj);
                toast.info('success');
                window.location.replace("/admin/products");

            } catch (ex) {
                logger.log(ex);

            }
        }






    };

    cancelSize(id) {
        this.setState({ sizes: this.state.sizes.filter(s => s._id !== id) });
    }

    addSize(data, sizes) {
        if (!data.size) return this.setState({ errors: { size: "size cannot be empty" } });
        if (!data.price) return this.setState({ errors: { price: "price cannot be empty" } });
        this.setState({ sizes: [...sizes, { size: data.size, price: data.price }], data: { ...data, size: "", price: "" } });

    }


    render() {
        const { categories, statistics, genres, data, errors, sizes } = this.state;
        const id = this.productId === "new";
        return (
            <div className="product">
                <div className="productTitleContainer">
                    <h1 className="productTitle">{id ? "Create product" : "Update product"}</h1>
                </div>
                {!id &&
                    <div className="productTop">
                        <div className="productTopLeft">
                            <Chart data={statistics} dataKey="Sales" title="Sales Performance" />
                        </div>
                        <div className="productTopRight">
                            <div className="productInfoTop">
                                {data.image && <img src={data.image.name ? URL.createObjectURL(data.image) : data.image} alt={data.title} className="productInfoImg" />}
                                <span className="productName">{data.title}</span>
                            </div>
                            <div className="productInfoBottom">
                                <div className="productInfoItem">
                                    <span className="productInfoKey"><strong>id:</strong></span>
                                    <span className="productInfoValue">{data._id}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">sales:</span>
                                    <span className="productInfoValue">5123</span>
                                </div>

                                <div className="productInfoItem">
                                    <span className="productInfoKey"> stock:</span>
                                    <span className="productInfoValue">{data.numberInStock}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="productBottom">
                    <form className="productForm" onSubmit={this.handleSubmit}>
                        <div className="productFormLeft">
                            {this.renderInput("title", "Name")}
                            {this.renderInput("numberInStock", "Stock")}
                            {this.renderInput("description", "Description")}
                            {this.renderInput("color", "Color", "", "optional")}
                            <div className="m-1">

                                {sizes?.length > 0 && <table className="table table-sm table-striped info m-1">
                                    <thead>

                                        <tr className="table-danger">
                                            <th>size</th>
                                            <th>price</th>
                                            <th>delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {sizes.map((s, i) => <tr key={i} className='table-info'>
                                            <td>{s.size}</td>
                                            <td>{s.price}</td>
                                            <td>

                                                <DeleteForeverOutlined onClick={() => this.cancelSize(s._id)} />
                                            </td>
                                        </tr>)}

                                    </tbody>
                                </table>}
                                <div className="flex">

                                    <div className="form-group  m-1">
                                        <label htmlFor="size">Size</label>
                                        <input
                                            defaultValue={data.size}
                                            errors={errors.size}
                                            type="text"
                                            name="size" className="form-control"
                                            placeholder="ml,g,L,XXL..."
                                            onChange={this.handleChange}

                                        />
                                    </div>
                                    <div className="form-group  m-1">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            defaultValue={data.price}
                                            errors={errors.price}
                                            type="text"
                                            name="price" className="
                                    form-control"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <span className="badge  badge-rounded bg-primary m-1" onClick={() => this.addSize(data, sizes)}>Add</span>

                                </div>
                                {(errors.size || errors.price) && <div className="alert alert-danger m-1">{errors.size || errors.price}</div>}
                            </div>

                            {this.renderSelect("categoryId", "Category", categories)}
                            {this.renderSelect("sex", "Sex", genres)}
                        </div>
                        <div className="productFormRight">
                            <div className="productUpload">
                                {data.image && <img src={data.image.name ? URL.createObjectURL(data.image) : data.image} alt={data.image} className="productUploadImg" />}
                                <label htmlFor="file">
                                    <Publish /><small>{id ? "Add Image" : "Update Image"}</small>
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} onChange={(e) => this.setState({ data: { ...data, image: e.target.files[0] } })} />
                            </div>
                            {this.renderButton(this.productId === "new" ? "create" : "Update")}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(Product);