import {TbBrandDatabricks} from "react-icons/tb"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {GetClientWithToken} from "../../utils/auth"
import './brand.css'

const Brand = () => {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const client = await GetClientWithToken();
                const response = await client.get('/AssetBrand');
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        };
        fetchBrands();
    }, []);

    return (
        <div>
            <div className="header">
                <div className="header-left">
                    <TbBrandDatabricks className="heading-icon"/>
                    <h3 className="heading">Brands</h3>
                </div>
                <div className="header-right">
                    <a href="/brand/add" className="btn-add"><span className="plus-sign">&#43;</span>Add Brand</a>
                </div>
            </div>
            <div><hr/></div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Brand Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {brands.map((brand) => (
                    <tr key={brand.id}>
                        <td>{brand.brandName}</td>
                        <td>
                            <button
                                onClick={() => navigate(`/brand/edit/${brand.id}`, { state: { brandId: brand.id, brandName: brand.brandName } })}
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
    );
}

export default Brand
