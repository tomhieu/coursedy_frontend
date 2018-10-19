import teacherCourseManagement from './teacherCourseManagement';
import teacherCourseBuilding from './teacherCourseBuilding';

export default {
  vn: {
    coursedy_works_student_tab: 'Học Viên',
    coursedy_works_teacher_tab: 'Giáo Viên',
    coursedy_works_for_teacher_select_a_topic: 'Chọn mục muốn tìm hiểu',
    coursedy_works_for_teacher_card_account: 'Tài Khoản',
    coursedy_works_for_teacher_card_account_description: 'Quản lý và thiết lập tài khoản.',
    coursedy_works_for_teacher_card_course_building: 'Tạo Khoá Học',
    coursedy_works_for_teacher_card_course_building_description: 'Cách thức tạo một khoá học.',
    coursedy_works_for_teacher_card_course_management: 'Quản Lý Khoá Học',
    coursedy_works_for_teacher_card_course_management_description: 'Cách thức quản lý khoá học.',
    coursedy_works_for_teacher_card_payment: 'Thanh Toán',
    coursedy_works_for_teacher_card_payment_description: 'Hiểu về cách thức nhận tiền từ học viên và các khoản thu phí của Coursedy.',
    coursedy_works_for_student_update_soon: 'Nội dung sẽ được cập nhật sớm.',
    ...teacherCourseManagement.vn,
    ...teacherCourseBuilding.vn,
  },
  en: {
    coursedy_works_student_tab: 'Student',
    coursedy_works_teacher_tab: 'Teacher',
    coursedy_works_for_teacher_select_a_topic: 'Select a topic to search for help',
    coursedy_works_for_teacher_card_account: 'Account/Profile',
    coursedy_works_for_teacher_card_account_description: 'Manage your account settings.',
    coursedy_works_for_teacher_card_course_building: 'Course Building',
    coursedy_works_for_teacher_card_course_building_description: 'How to build a course.',
    coursedy_works_for_teacher_card_course_management: 'Course Management',
    coursedy_works_for_teacher_card_course_management_description: 'How to management the courses.',
    coursedy_works_for_teacher_card_payment: 'Payments',
    coursedy_works_for_teacher_card_payment_description: 'Understand how to receive money from students and what Coursedy\'s fees are.',
    coursedy_works_for_student_update_soon: 'Content will be update soon.',
    ...teacherCourseManagement.en,
    ...teacherCourseBuilding.en,
  }
};
