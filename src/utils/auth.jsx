import axios from "axios";

const BASE_ADDRESS = 'https://localhost:44347/api';

const GenerateToken = async () => {
    const id = '64ae62e1fc114531f2de4956';
    const role = 'SuperAdmin';
    const username = 'George';

    try {
        const response = await axios.get(`${BASE_ADDRESS}/Auth/generate?id=${id}&role=${role}&username=${username}`);
        return response.data;
    } catch (error) {
        console.error('Error generating token: ', error);
        throw error;
    }
};

const GetClientWithToken = async () => {
    return axios.create({
        baseURL: BASE_ADDRESS,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (await GetCachedToken())
        }
    });
};

const GetCachedToken = async () => {
    const Token = await GenerateToken();
    return Token || '';
};

export { GetClientWithToken }
