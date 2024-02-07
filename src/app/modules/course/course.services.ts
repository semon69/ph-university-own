import mongoose from 'mongoose';
import QueryBuilder from '../../builders/QueryBuilder';
import { courseSearchAbleFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { AppError } from '../../errors/appErrors';
import httpStatus from 'http-status';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();
  
  return {
    meta,
    result,
  };
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicData = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicData) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        ' Falied to update course basic info',
      );
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPrerequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPrerequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: {
                $in: deletedPrerequisites,
              },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPrerequisitesCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          ' Falied to delete pre requisite course',
        );
      }

      const newPrereuisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPrereuisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPrereuisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPrereuisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          ' Falied to add pre requisite course',
        );
      }
      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );

      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, ' Falied to update course');
  }
};

const deleteACourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultiesWithCourseIntoDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return result;
};

const getFacultiesWithCourseFromDb = async (courseId: string) => {
  const result = await CourseFaculty.findOne({ course: courseId }).populate(
    'faculties',
  );
  return result;
};

const removeFacultiesWithCourseIntoDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );

  return result;
};

export const courseServices = {
  createCourseIntoDb,
  getCoursesFromDb,
  getSingleCourseFromDb,
  updateCourseIntoDb,
  deleteACourseFromDb,
  assignFacultiesWithCourseIntoDb,
  getFacultiesWithCourseFromDb,
  removeFacultiesWithCourseIntoDb,
};
