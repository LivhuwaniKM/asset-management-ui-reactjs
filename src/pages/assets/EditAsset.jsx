import {MdAddBox} from "react-icons/md";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {GetClientWithToken} from "../../utils/auth";

const EditAsset = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [assetId, setAssetId] = useState('');
    const [brandName, setBrandName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (location.state) {
            const { id, brandName, categoryName, serialNo, description } = location.state;
            setAssetId(id);
            setBrandName(brandName);
            setCategoryName(categoryName);
            setSerialNo(serialNo);
            setDescription(description);
        }
        console.log('complete asset model');
        console.log(location.state);
    }, [location.state]);

    const handleCancel = () => {
        navigate('/allassets');
    };

    const handleSubmit = async () => {
        try {
            const client = await GetClientWithToken();
            const response = await client.put(`/Assets/${assetId}`, {
                ...location.state,
                brandName,
                categoryName,
                serialNo,
                description
            });
            if (response) {
                navigate('/allassets');
            } else {
                console.log('Error updating asset');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <div className="headerEdit d-flex align-items-center gap-4">
                <MdAddBox className="headerIcon" />
                <h3>Edit Asset</h3>
            </div>
            <hr className="horizontal pb-3" />

            <div className="w-75 m-auto">
                <div className="pb-4">
                    <label>Brand Name</label>
                    <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Brandname"
                    />
                </div>

                <div className="pb-4">
                    <label>Category Name</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Category Name"
                    />
                </div>

                <div className="pb-4">
                    <label>Serial Number</label>
                    <input
                        type="text"
                        value={serialNo}
                        onChange={(e) => setSerialNo(e.target.value)}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Serial Number"
                    />
                </div>

                <div className="pb-4">
                    <label>Description</label>
                    <input
                        type="text"
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
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAsset
