import schooldb from '@/Assets/school_db.js'

const AITool = {

  //  SCHOOL FUNCTIONS
  getSchoolInfo() {
    return schooldb.school;
  },

  getSchoolName(name) {
    return schooldb.school.name.toLowerCase() === name.toLowerCase() ? schooldb.school : null;
  },

  //  CLASS FUNCTIONS
  getClassById(id) {
    return schooldb.classes.find(cls => cls.class_id === id) || null;
  },

  getClassByName(name) {
    return schooldb.classes.find(cls => cls.class_name.toLowerCase() === name.toLowerCase()) || null;
  },

  getSubjectsByClassId(classId) {
    const cls = schooldb.classes.find(c => c.class_id === classId);
    return cls ? cls.subjects : [];
  },

  //  STUDENT FUNCTIONS
  getAllStudents() {
    return schooldb.students;
  },

  getStudentById(id) {
    return schooldb.students.find(stu => stu.student_id === id) || null;
  },

  getStudentsByClassId(classId) {
    return schooldb.students.filter(stu => stu.class_id === classId);
  },

  getStudentByName(name) {
    return schooldb.students.find(stu => stu.name.toLowerCase() === name.toLowerCase()) || null;
  },

  getStudentEnrolledSubjects(studentId) {
    const student = schooldb.students.find(stu => stu.student_id === studentId);
    if (!student) return [];
    return student.subjects_enrolled.map(subId => {
      for (const cls of schooldb.classes) {
        const subject = cls.subjects.find(s => s.subject_id === subId);
        if (subject) return subject.subject_name;
      }
    }).filter(Boolean);
  },

  //  TEACHER FUNCTIONS
  getTeacherById(id) {
    return schooldb.teachers.find(t => t.teacher_id === id) || null;
  },

  getTeacherByName(name) {
    return schooldb.teachers.find(t => t.name.toLowerCase() === name.toLowerCase()) || null;
  },

  getTeachersBySubjectId(subjectId) {
    return schooldb.teachers.filter(t => t.subjects_taught.includes(subjectId));
  },

  //  EMPLOYEE FUNCTIONS
  getEmployeeById(id) {
    return schooldb.employees.find(e => e.employee_id === id) || null;
  },

  getEmployeeByName(name) {
    return schooldb.employees.find(e => e.name.toLowerCase() === name.toLowerCase()) || null;
  },

  getEmployeesByRole(role) {
    return schooldb.employees.filter(e => e.role.toLowerCase() === role.toLowerCase());
  },

  //  ATTENDANCE FUNCTIONS
  getAttendanceByDate(date) {
    return schooldb.attendance.find(a => a.date === date) || null;
  },

  getStudentAttendance(studentId) {
    return schooldb.attendance.map(day => {
      const record = day.students.find(s => s.student_id === studentId);
      return { date: day.date, status: record ? record.status : 'N/A' };
    });
  },

  getTeacherAttendance(teacherId) {
    return schooldb.attendance.map(day => {
      const record = day.teachers.find(t => t.teacher_id === teacherId);
      return { date: day.date, status: record ? record.status : 'N/A' };
    });
  },

  getEmployeeAttendance(employeeId) {
    return schooldb.attendance.map(day => {
      const record = day.employees.find(e => e.employee_id === employeeId);
      return { date: day.date, status: record ? record.status : 'N/A' };
    });
  },

  getAttendanceByMonth(month) {
    return schooldb.attendance.filter(a => new Date(a.date).getMonth() + 1 === month);
  },

  getStudentsByGender(gender) {
    return schooldb.students.filter(stu => stu.gender.toLowerCase() === gender.toLowerCase());
  },

  getTopStudentsByMarks(limit = 5) {
    const sorted = [...schooldb.students].sort((a, b) => b.total_marks - a.total_marks);
    return sorted.slice(0, limit);
  },

};

export const toolsList = [
  { description: "Get School Info", func: AITool.getSchoolInfo, name: "getSchoolInfo" },
  { description: "Get School by Name", func: AITool.getSchoolName, name: "getSchoolName" },
  { description: "Get Class by ID", func: AITool.getClassById, name: "getClassById" },
  { description: "Get Class by Name", func: AITool.getClassByName, name: "getClassByName" },
  { description: "Get Subjects by Class ID", func: AITool.getSubjectsByClassId, name: "getSubjectsByClassId" },
  { description: "Get All Students", func: AITool.getAllStudents, name: "getAllStudents" },
  { description: "Get Student by ID", func: AITool.getStudentById, name: "getStudentById" },
  { description: "Get Students by Class ID", func: AITool.getStudentsByClassId, name: "getStudentsByClassId" },
  { description: "Get Student by Name", func: AITool.getStudentByName, name: "getStudentByName" },
  { description: "Get Student Enrolled Subjects", func: AITool.getStudentEnrolledSubjects, name: "getStudentEnrolledSubjects" },
  { description: "Get Teacher by ID", func: AITool.getTeacherById, name: "getTeacherById" },
  { description: "Get Teacher by Name", func: AITool.getTeacherByName, name: "getTeacherByName" },
  { description: "Get Teachers by Subject ID", func: AITool.getTeachersBySubjectId, name: "getTeachersBySubjectId" },
  { description: "Get Employee by ID", func: AITool.getEmployeeById, name: "getEmployeeById" },
  { description: "Get Employee by Name", func: AITool.getEmployeeByName, name: "getEmployeeByName" },
  { description: "Get Employees by Role", func: AITool.getEmployeesByRole, name: "getEmployeesByRole" },
  { description: "Get Attendance by Date", func: AITool.getAttendanceByDate, name: "getAttendanceByDate" },
  { description: "Get Student Attendance", func: AITool.getStudentAttendance, name: "getStudentAttendance" },
  { description: "Get Teacher Attendance", func: AITool.getTeacherAttendance, name: "getTeacherAttendance" },
  { description: "Get Employee Attendance", func: AITool.getEmployeeAttendance, name: "getEmployeeAttendance" },
  { description: "Get Attendance by Month", func: AITool.getAttendanceByMonth, name: "getAttendanceByMonth" },
  { description: "Get Students by Gender", func: AITool.getStudentsByGender, name: "getStudentsByGender" },
  { description: "Get Top Students by Marks", func: AITool.getTopStudentsByMarks, name: "getTopStudentsByMarks" },
];

export default AITool;
