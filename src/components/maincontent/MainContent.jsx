import React from "react"
import './maincontent.css'
import {Route, Routes} from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Brand from "../../pages/brands/Brand";
import Category from "../../pages/categories/Category";
import Asset from "../../pages/assets/Asset";
import BrandAdd from "../../pages/brands/BrandAdd";
import BrandEdit from "../../pages/brands/BrandEdit";
import ServiceCall from "../../pages/servicecall/ServiceCall";
import Role from "../../pages/roles/Role";
import EmployeeAsset from "../../pages/employeeassets/EmployeeAsset";
import EditAsset from "../../pages/assets/EditAsset";
import AddAsset from "../../pages/assets/AddAsset";
import AddCategory from "../../pages/categories/AddCategory";
import EditCategory from "../../pages/categories/EditCategory";

const MainContent = () => {
    return (
        <div className="main-content">
            <Routes>
                <Route index path="/" element={<><h1>Home</h1></>} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/brands" element={<Brand />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/allassets" element={<Asset />} />
                <Route path="/servicecall" element={<ServiceCall />}/>
                <Route path="/roles" element={<Role />}/>
                <Route path="/myassets" element={<EmployeeAsset />}/>

                <Route path="/brand/add" element={<BrandAdd /> } />
                <Route path="/brand/edit/:id" element={<BrandEdit /> } />

                <Route path="/asset/add" element={<AddAsset />} />
                <Route path="/asset/edit/:id" element={<EditAsset />} />

                <Route path="/category/add" element={<AddCategory />} />
                <Route path="/category/edit/:id" element={<EditCategory />} />
            </Routes>
        </div>
    )
}

export default MainContent
