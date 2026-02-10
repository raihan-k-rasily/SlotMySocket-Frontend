import {serverURL} from "./serverURL"
import commonAPI from "./commonAPI"

//function to call API endpoints
//1 register user
export const registerUserAPI = async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/api/register`,reqBody,{})
}

//2 login user
export const loginAPI = async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/api/login`,reqBody,{})
}

//3  Google login user
export const GoogleloginUserAPI = async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/api/google-login`,reqBody,{})
}

//4 register owner
export const registerOwnerAPI = async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/api/registerowner`,reqBody,{})
}

//5 Get Pending Stations
export const getPendingStationsAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${serverURL}/api/admin/getPendingStations`,{},reqHeader)
}

// 6 update Station Status API
export const updateStationStatusAPI = async (id, data, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/api/admin/station-status/${id}`, data, reqHeader);
};

//7 Get Pending Stations
export const getVerifiedStationsAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${serverURL}/api/admin/getVerifiedStationsAPI`,{},reqHeader)
}

// 8 Get All Users API
export const getAllUsersAPI = async (reqHeader) => {
    return await commonAPI('GET', `${serverURL}/api/admin/all-users`, {}, reqHeader);
};

// 9 update Users Status API
export const updateUserStatusAPI = async (id, data, reqHeader) => {
    return await commonAPI('PUT', `${serverURL}/api/admin/update-user-status/${id}`, data, reqHeader);
};

// 10 Get All Stations by  OwnerId API
export const getViewOwnerStations = async (reqHeader) => {
    return await commonAPI('GET', `${serverURL}/api/owner/view-owner-stations`, {}, reqHeader);
};

// 11 Add new Station by owner API
export const addNewStationsByOwner = async (reqBody,reqHeader) => {
    return await commonAPI('POST', `${serverURL}/api/owner/add-owner-stations`, reqBody, reqHeader);
};

// 12 Add new Socket by owner API
export const addNewsocketByOwner = async (reqBody,reqHeader) => {
    return await commonAPI('POST', `${serverURL}/api/owner/add-owner-socket`, reqBody, reqHeader);
};


// 13 Get Socket by Station API
export const getStationSckets = async (reqBody,reqHeader) => {
    return await commonAPI('POST', `${serverURL}/api/owner/get-station-socket`, reqBody, reqHeader);
};