import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academic-semester/academicSemester.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academicSemester',
        route: AcademicSemesterRoutes
    }
]

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route))
// Application route
// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

export default router