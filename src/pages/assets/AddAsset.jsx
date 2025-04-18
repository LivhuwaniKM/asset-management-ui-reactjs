import {GetClientWithToken} from "../../utils/auth";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MdAddBox} from "react-icons/md";

const AddAsset = () => {
    const navigate = useNavigate();

    const [categoriesList, setCategoriesList] = useState([]);
    const [categoryBrandMapping, setCategoryBrandMapping] = useState([]);


    const [brandName, setBrandName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchCategoriesList();
    }, []);

    const fetchCategoriesList = async () => {
        try {
            const client = await GetClientWithToken();
            const response = await client.get('/AssetCategory');
            setCategoriesList(response.data);
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    }

    useEffect(() => {
        fetchCategoryBrandMapping();
    }, []);

    const fetchCategoryBrandMapping = async () => {
        try {
            const client = await GetClientWithToken();
            const response = await client.get(`/brands?CategoryId=${categoryName}`);
            setCategoriesList(response.data);
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    }

    const handleCancel = () => {
        navigate('/allassets');
    };

    const handleSubmit = async () => {
        try {
            const client = await GetClientWithToken();
            const response = await client.post('/Assets', {
                brandName,
                categoryName,
                serialNo,
                description
            });
            if (response) {
                navigate('/allassets');
            } else {
                console.log('Error adding asset');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <div className="headerEdit d-flex align-items-center gap-4">
                <MdAddBox className="headerIcon" />
                <h3>Add Asset</h3>
            </div>
            <hr className="horizontal pb-3" />

            <div className="w-75 m-auto">

                <div className="pb-4">
                    <select
                        name="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                    >
                        <option value="">Select Category</option>
                        {categoriesList.map(category => (
                            <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>

                <div className="pb-4">
                    <input
                        type="text"
                        name="brandName"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Brandname"
                    />
                </div>

                <div className="pb-4">
                    <input
                        type="text"
                        name="serialNo"
                        value={serialNo}
                        onChange={(e) => setSerialNo(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Serialnumber"
                    />
                </div>

                <div className="pb-4">
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Description"
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn-cancel"
                    >
                        CANCEL
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn-save"
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
}

/*const AddAsset = () => {
    const navigate = useNavigate();

    const [categoriesList, setCategoriesList] = useState();

    // State variables for asset properties
    const [brandName, setBrandName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [description, setDescription] = useState('');

    const fetchCategoriesList = async () => {
        const client = await GetClientWithToken();
        const response = client.get('/AssetCategory');
        setCategoriesList(response.data);
    }

    const handleCancel = () => {
        navigate('/allassets');
    };

    const handleSubmit = async () => {
        // Add asset logic here
        try {
            const client = await GetClientWithToken();
            const response = await client.post('/Assets', {
                brandName,
                categoryName,
                serialNo,
                description
                // Add other properties as needed
            });
            if (response) {
                navigate('/allassets');
            } else {
                console.log('Error adding asset');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <div className="headerEdit d-flex align-items-center gap-4">
                <MdAddBox className="headerIcon" />
                <h3>Add Asset</h3>
            </div>
            <hr className="horizontal pb-3" />

            <div className="w-75 m-auto">
                <div className="pb-4">
                    <input
                        type="text"
                        name="brandName"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Brandname"
                    />
                </div>

                {/!* Additional fields *!/}
                <div className="pb-4">
                    <input
                        type="text"
                        name="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Categoryname"
                    />
                </div>

                {<div className="pb-4">
                    <input
                        type="text"
                        name="serialNo"
                        value={serialNo}
                        onChange={(e) => setSerialNo(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Serialnumber"
                    />
                </div>}

                <div className="pb-4">
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="description"
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn-cancel"
                    >
                        CANCEL
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn-save"
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
}*/

export default AddAsset
