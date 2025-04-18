import {MdAddBox} from "react-icons/md";
import {GetClientWithToken} from "../../utils/auth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const BrandAdd = () => {
    const [brandName, setBrandName] = useState('');
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/brands');
    };

    const handleSubmit = async () => {
        try {
            if (!brandName) {
                console.log('Brand name is required');
                return;
            }

            const data = {
                brandName: brandName,
            };

            const client = await GetClientWithToken();
            const response = await client.post('/AssetBrand', data);

            if (response) {
                navigate('/brands');
            }
        } catch (error) {
            console.error('Error handling brand: ' + error);
        }
    };

    return (
        <div>
            <div className="headerAdd d-flex align-items-center gap-4">
                <MdAddBox className="headerIcon" />
                <h3>Add Brand</h3>
            </div>
            <hr className="horizontal pb-3" />

            <div className="w-75 m-auto">
                <div className="pb-4">
                    <input
                        type="text"
                        id="brandName"
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="Brandname"
                        className="w-100 p-2 rounded border border-b-neutral-500"
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
                        type="submit"
                        onClick={handleSubmit}
                        className="btn-save"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BrandAdd;
