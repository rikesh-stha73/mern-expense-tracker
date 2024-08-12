import { BASE_URL } from "../../utils/url";
import axios from 'axios';
import {getUserFromStorage} from "../../utils/getUserFromStorage";

//!Get the token 
const token = getUserFromStorage();

//!Add Category
export const addTransactionAPI = async ({ type, category, date, description, amount }) => {
    const response = await axios.post(`${BASE_URL}/transaction/create`, {
        type,
        category,
        date,
        description,
        amount,
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);
    //Return promise
    return response.data;
}

//!List Transactions
export const listTransactionsAPI = async ({category, type, startDate, endDate}) => {
    const response = await axios.get(`${BASE_URL}/transaction/lists`,{
        params: {
            category,
            type,
            startDate,
            endDate,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //Return promise
    return response.data.transactions;
}

//!Get Category by ID
export const getCategoryAPI = async (id) => {
    const response = await axios.get(`${BASE_URL}/categories/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  };
  
//!Update Category
export const updateCategoryAPI = async ({name, type, id}) => {
    const response = await axios.put(`${BASE_URL}/categories/update/${id}`, {
        name,
        type,
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);
    //Return promise
    return response.data;
}


//!Delete Category
export const deleteCategoryAPI = async (id) => {
    
    const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);
    //Return promise
    return response.data;
}