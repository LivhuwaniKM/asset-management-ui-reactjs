import {GetClientWithToken} from "../../utils/auth";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MdAddBox} from "react-icons/md";

const BrandEdit = () => {
    const {id} = useParams();   // used to retrieve id from url
    const navigate = useNavigate();
    const [brandValue, setBrandValue] = useState({
        id: id,
        brandName: '',
        isActive: true
    });

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const client = await GetClientWithToken();
                const response = await client.get(`/AssetBrand/${id}`);

                if (response) {
                    setBrandValue(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBrand();
    }, []);

    function handleCancel() {
        navigate('/brands');
    }

    const handleSubmit = async () => {
        try {
            const client = await GetClientWithToken();
            const response = await client.put(`/AssetBrand/${id}`, brandValue);

            if (response) {
                console.log('update brand successful');
                navigate('/brands');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="headerEdit d-flex align-items-center gap-4">
                <MdAddBox className="headerIcon" />
                <h3>Edit Brand</h3>
            </div>
            <hr className="horizontal pb-3" />

            <div className="w-75 m-auto">
                <div className="pb-4">
                    <label>Brand Name</label>
                    <input
                        type="text"
                        name="brandName"
                        value={brandValue.brandName}
                        onChange={(e) => setBrandValue({...brandValue, brandName: e.target.value})}
                        className="w-100 p-2 rounded border border-b-neutral-500"
                        placeholder="Brandname"
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
                        EDIT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BrandEdit;
