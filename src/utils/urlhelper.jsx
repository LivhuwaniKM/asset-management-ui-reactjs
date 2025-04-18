import {useEffect, useState} from "react";
import {GetClientWithToken} from "./auth";

const FeatureUrlHelper = () => {
    const [featureUrls, setFeatureUrls] = useState([]);

    useEffect(() => {
        const fetchFeatureUrls = async () => {
            try {
                const client = await GetClientWithToken();
                const response = await client.get('/Feature');
                setFeatureUrls(response.data);
            } catch (error) {
                console.log('Error fetching data: ', error)
            }
        };
        fetchFeatureUrls();
    }, []);

    return featureUrls;
}

export default FeatureUrlHelper;
