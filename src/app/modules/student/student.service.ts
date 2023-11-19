import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (student: TStudent) => {
  // for static method, don't need creating instance
  if (await Student.isUserExists(student.id)) {
    throw new Error('User already exists')
  }
  const result = await Student.create(student);

  // For custom instance method
  // const studentData = new Student(student); // creating instance
  // if (await studentData.isUserExists(studentData.id)) {
  //   throw new Error('User already exist')
  // }
  // const result = studentData.save()
  return result;
};

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
export const studentServices = {
  createStudentIntoDB,
  getAllStudents,
  getSingleStudent,
};
