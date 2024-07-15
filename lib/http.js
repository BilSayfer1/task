import axios from 'axios';

const baseURL = 'http://localhost:8080';

export const getData = async (path) => {
    try {
        const res = await axios.get(baseURL + path);
        if(res.status === 200 || res.status === 201) {
            return res.data;
        }
    } catch(error) {
        console.log(error);
    }
}

export const postData = async (path, body) => {
    try {
        const res = await axios.post(baseURL + path, body);
        if(res.status === 200 || res.status === 201) {
            return res.data;
        }
    } catch(error) {
        console.log(error);
    }
}

export const patchData = async (path, body) => {
    try {
        const res = await axios.patch(baseURL + path, body);
        if(res.status === 200 || res.status === 201) {
            return res.data;
        }
    } catch(error) {
        console.log(error);
    }
}
