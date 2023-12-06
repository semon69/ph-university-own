import { Schema, model } from 'mongoose';
import { TCourse, TPrerequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPrerequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    required: [true, 'Title is required'],
  },
  prefix: {
    type: String,
    required: [true, 'Prefix is required'],
  },
  code: {
    type: Number,
    required: [true, 'Number is required'],
  },
  credits: {
    type: Number,
    required: [true, 'Credits is required'],
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Course = model<TCourse>('Course', courseSchema);
