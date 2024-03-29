import axios from 'axios';

export const serverUrl = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';

export const getToken = async (userId, profileObj) => {
    const tokenObj = await axios.get(`${serverUrl}/token/?id=${userId}&profileObj=${JSON.stringify(profileObj)}`);
    const {token} = tokenObj.data;
    return token;
};

export const getOffers = async (accessToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    const offersObj = await axios.get(`${serverUrl}/offers`, {headers});
    const {stores} = offersObj.data;
    return stores;
};

export const getSettings = async (accessToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    const settingsObj = await axios.get(`${serverUrl}/settings`, {headers});
    const {settings} = settingsObj.data;
    return settings;
};

export const getUser = async (accessToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    const settingsObj = await axios.get(`${serverUrl}/user`, {headers});
    const {user} = settingsObj.data;
    return user;
};

export const getHistory = async (accessToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    return axios
        .get(`${serverUrl}/history`, { headers })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error fetching history', error);
        });
};

export const getOrderHistory = async (accessToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    return axios
        .get(`${serverUrl}/orders`, { headers })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error fetching history', error);
        });
};

export const doPayment = (amount, tokenId, accessToken, newOrder) => {
    const body = {
        amount: amount,
        tokenId: tokenId,
        newOrder: newOrder,
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    return axios
        .post(`${serverUrl}/doPayment`, body, { headers })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error in making payment', error);
        });
};

export const saveSettings = (accessToken, settings) => {
    const body = {
        settings,
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    return axios
        .post(`${serverUrl}/settings`, body, { headers })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error in saving settings', error);
        });
};

export const addOffer = (accessToken, offer) => {
    const body = {
        offer,
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    return axios
        .post(`${serverUrl}/offer`, body, { headers })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error in posting offer', error);
        });
};

export const deleteOffer = (accessToken, offer) => {
    const body = {
        offer,
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    return axios
        .delete(`${serverUrl}/offer`, { headers, data: body })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error in posting offer', error);
        });
};

export const getOrders = (accessToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    return axios
        .get(`${serverUrl}/orders`, { headers })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error in posting offer', error);
        });
};

export const getRole = (accessToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    return axios
        .get(`${serverUrl}/role`, { headers })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error in posting offer', error);
        });
};

export const getUploadProps = (accessToken, message) =>
    ({
    name: 'file',
    action: `${serverUrl}/images`,
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
    },
});

export const sendEmailAddress = (email) => {
    const body = {
        email,
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    return axios
        .post(`${serverUrl}/emailcapture`, body, { headers })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error in posting offer', error);
        });
};
