import QueryBuilder from '../../builders/QueryBuilder';
import { courseSearchAbleFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

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
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const result = await Course.findByIdAndUpdate(id, remainingCourseData, {
    new: true,
    runValidators: true,
  });

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletedPrerequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);
    const deletedPrerequisitesCourses = await Course.findByIdAndUpdate(id, {
      $pull: {
        preRequisiteCourses: {
          course: {
            $in: deletedPrerequisites,
          },
        },
      },
    });
  }
  return result;
};

const deleteACourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDb,
  getCoursesFromDb,
  getSingleCourseFromDb,
  updateCourseIntoDb,
  deleteACourseFromDb,
};
