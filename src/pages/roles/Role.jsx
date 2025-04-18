import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetClientWithToken} from "../../utils/auth";
import {TbBrandDatabricks} from "react-icons/tb";

const Role = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const client = await GetClientWithToken();
                const response = await client.get('/Role');
                setRoles(response.data)
            } catch(error) {
                console.log(error)
            }
        }
        fetchRoles();
    }, []);

    return (
        <div>
            <div className="header d-flex justify-content-between px-20">
                <div className="header-left">
                    <TbBrandDatabricks className="heading-icon"/>
                    <h3 className="">Roles</h3>
                </div>
                <div className="header-right">
                    <a href="/role/add" className="btn-add"><span className="plus-sign">&#43;</span>Add Role</a>
                </div>
            </div>
            <div><hr/></div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Role Name</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {roles.map((role) => (
                    <tr key={role.id}>
                        <td>{role.name}</td>
                        <td>
                            <button
                                onClick={() => navigate(`/role/edit/${role.id}`, { state: { roleId: role.id, name: role.Name } })}
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

export default Role
