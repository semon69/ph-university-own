import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academic-semester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academic-faculty/academicFaculty.routes';
import { AcademicDepartmentRoutes } from '../modules/academic-department/academicDepartment.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { SemesterRegistrationRoutes } from '../modules/semester-registration/semesterRegistration.routes';
import { offeredCourseRoutes } from '../modules/offeredCourses/offeredCourse.routes';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { EnrolledCourseRoutes } from '../modules/enrolled-course/enrolledCourse.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academicSemester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academicFaculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academicDepartment',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semesterRegistrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offeredCourses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolledCourse',
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));
// Application route
// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

export default router;
