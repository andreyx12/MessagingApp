
import axios from 'axios';
import * as Constants from '../utils/Constants';

const baseUrl = `https://api-${Constants.APP_ID}.sendbird.com/v3`;

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    'Api-Token': Constants.API_TOKEN
};

export const validateUser = async (userId) => {
    const data = await axios.get(`${baseUrl}/users/${userId}`, {
        headers: headers
    });
    return data;
};

export const createUser = async (userData) => {
    const data = await axios.post(`${baseUrl}/users`, userData, {
        headers: headers
    });
    return data;
};