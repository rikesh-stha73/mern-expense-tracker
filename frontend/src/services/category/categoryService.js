import { BASE_URL } from "../../utils/url";
import axios from 'axios';
import {getUserFromStorage} from "../../utils/getUserFromStorage";

//!Get the token 
const token = getUserFromStorage();

//!Add Category
export const addCategoryAPI = async ({name, type}) => {
    const response = await axios.post(`${BASE_URL}/categories/create`, {
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

//!List Category
export const listCategoriesAPI = async () => {
    const response = await axios.get(`${BASE_URL}/categories/lists`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //Return promise
    return response.data.categories;
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