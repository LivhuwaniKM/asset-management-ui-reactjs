import {MdAddBox} from "react-icons/md";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetClientWithToken} from "../../utils/auth";

const AddCategory = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const client = await GetClientWithToken();
                const response = await client.get('/AssetBrand');
                setBrands(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBrands();
    }, []);

    function handleCancel() {
        navigate('/categories');
    }

    const handleSubmit = async () => {
        try {
            const client = await GetClientWithToken();
            // Assuming you need to send selected brands along with other data
            const data = {
                category,
                selectedBrands
            };
            const response = await client.put(`/`, data);
            // Handle response as needed
        } catch (error) {
            console.log(error);
        }
    }

    const handleBrandChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedBrands(selectedOptions);
    }

    return (
        <div>
            <div className="headerAdd d-flex align-items-center gap-4">
                <MdAddBox className="headerIcon" />
                <h3>Add Category</h3>
            </div>
            <hr className="horizontal pb-3" />

            <div className="w-75 m-auto">
                <div className="pb-4">
                    <label>Category Name</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Categoryname"
                        className="w-100 p-2 rounded border border-b-neutral-500"
                    />
                </div>
                <div className="pb-4">
                    <label>Brands</label>
                    <select
                        name="brandName"
                        multiple
                        value={selectedBrands}
                        onChange={handleBrandChange}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                    >
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                        ))}
                    </select>
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
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}

/*const AddCategory = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const client = await GetClientWithToken();
                const response = await client.get('/AssetBrand');
                setBrands(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBrands();
    }, []);

    function handleCancel() {
        navigate('/categories');
    }

    const handleSubmit = async () => {
        try {
            const client = await GetClientWithToken();
            const response = client.put(`/`)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="headerAdd d-flex align-items-center gap-4">
                <MdAddBox className="headerIcon" />
                <h3>Add Category</h3>
            </div>
            <hr className="horizontal pb-3" />

            <div className="w-75 m-auto">
                <div className="pb-4">
                    <label>Category Name</label>
                    <input
                        type="text"
                        id="categoryName"
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Categoryname"
                        className="w-100 p-2 rounded border border-b-neutral-500"
                    />
                </div>
                <div className="pb-4">
                    <label>Brands</label>
                    <select
                        name="brandName"
                        value={brands.brandName}
                        onChange={(e) => setBrands(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                    >
                        <option value={brands.id}>Select Brand</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.brandName}>{brand.brandName}</option>
                        ))}
                    </select>
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
                        type="submit"
                        onClick={handleSubmit}
                        className="btn-save"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}*/

export default AddCategory
