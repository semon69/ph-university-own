import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistration.services";

const createSemesterRegistration = catchAsync(async(req, res)=> {
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);
    return result
})

const getAllSemesterRegistration = catchAsync(async(req, res)=> {
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB();
    return result
})

const getSingleSemesterRegistration = catchAsync(async(req, res)=> {
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDB();
    return result
})

const updateSemesterRegistration = catchAsync(async(req, res)=> {
    const result = await semesterRegistrationServices.updateSemesterRegistrationIntoDB(req.body);
    return result
})

export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}