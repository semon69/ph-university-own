import { TSemesterRegistration } from "./semesterRegistration.interface";

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration)=> {

}

const getAllSemesterRegistrationFromDB = async() => {

}

const getSingleSemesterRegistrationFromDB = async() => {

}
const updateSemesterRegistrationIntoDB = async(payload: Partial<TSemesterRegistration>)=> {

}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}