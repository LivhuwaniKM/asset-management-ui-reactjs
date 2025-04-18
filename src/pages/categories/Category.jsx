import {useEffect, useState} from "react"
import {GetClientWithToken} from "../../utils/auth"
import {TbBrandDatabricks} from "react-icons/tb"
import {useNavigate} from "react-router-dom"
import './category.css'

const Category = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const client = await GetClientWithToken();
                const response = await client.get('/AssetCategory');
                setCategories(response.data)
            } catch(error) {
                console.log(error)
            }
        }
        fetchCategories();
    }, []);

    return (
        <div>
            <div className="header d-flex justify-content-between px-20">
                <div className="header-left">
                    <TbBrandDatabricks className="heading-icon"/>
                    <h3 className="">Categories</h3>
                </div>
                <div className="header-right">
                    <a href="/category/add" className="btn-add"><span className="plus-sign">&#43;</span>Add Category</a>
                </div>
            </div>
            <div><hr/></div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Category Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.categoryName}</td>
                        <td>
                            <button
                                onClick={() => navigate(`/category/edit/${category.id}`, { state: { categoryId: category.id, categoryName: category.categoryName } })}
                                className="btn-edit"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Category
