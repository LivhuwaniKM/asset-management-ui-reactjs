import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetClientWithToken} from "../../utils/auth";
import {TbBrandDatabricks} from "react-icons/tb";

const Asset = () => {
    const [assets, setAssets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const client = await GetClientWithToken();
                const response = await client.get('/Assets');
                setAssets(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAssets();
    }, []);

    const handleAddAsset = () => {
        navigate('/asset/add');
    };

    const handleEditAsset = (asset) => {
        navigate(`/asset/edit/${asset.id}`, { state: asset });
    };

    return (
        <div>
            <div className="header">
                <div className="header-left">
                    <TbBrandDatabricks className="heading-icon" />
                    <h3 className="heading">All Assets</h3>
                </div>
                <div className="header-right">
                    <a href="#" onClick={handleAddAsset} className="btn-add">
                        <span className="plus-sign">&#43;</span>Add Asset
                    </a>
                </div>
            </div>
            <div><hr/></div>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Category Name</th>
                        <th scope="col">Brand Name</th>
                        <th scope="col">Serial Number</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.id}>
                            <td>{asset.categoryName}</td>
                            <td>{asset.brandName}</td>
                            <td>{asset.serialNo}</td>
                            <td>{asset.description}</td>
                            <td>
                                <button onClick={() => handleEditAsset(asset)} className="btn-edit">
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

export default Asset
