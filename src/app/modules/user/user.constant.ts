import { TAcademicSemester } from '../academic-semester/academicSemester.interface';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';
// import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await Student.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent?.id : undefined;
};

const findLastFacultyId = async () => {
  const lastFaculty = await Faculty.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty?.id : undefined;
};

const findLastAdminId = async () => {
  const lastAdmin = await Admin.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastAdmin?.id ? lastAdmin?.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); // default last 4 digit
  const lastStudent = await findLastStudentId();
  const lastStudentYear = lastStudent?.substring(0, 4);
  const lastStudentCode = lastStudent?.substring(4, 6);
  const currentStudentYear = payload.year;
  const currentStudentCode = payload.code;

  if (
    lastStudent &&
    lastStudentYear == currentStudentYear &&
    lastStudentCode == currentStudentCode
  ) {
    currentId = lastStudent?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFaculty = await findLastFacultyId()
  if (lastFaculty) {
    currentId = lastFaculty?.substring(2) ;
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastFaculty = await findLastAdminId()
  if (lastFaculty) {
    currentId = lastFaculty?.substring(2) ;
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;
  return incrementId;
};
