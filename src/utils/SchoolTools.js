import schooldb from '@/Assets/school_db.js'

const AITool = {

  //  SCHOOL FUNCTIONS
  getSchoolInfo() {
    return schooldb.school;
  },

  getSchoolName(name) {
    return schooldb.school.find(sc => sc.name.toLowerCase() === name.toLowerCase()) || null;
  },

  //  CLASS FUNCTIONS
  getClassByStudentId(id) {
    return schooldb.classes.find(cls => cls.id === id) || null;
  },

  getClassByStudentName(name) {
    return schooldb.classes.find(cls => cls.name.toLowerCase() === name.toLowerCase()) || null;
  },

  getClassId(name) {
    const cls = schooldb.classes.find(c => c.name.toLowerCase() === name.toLowerCase());
    return cls ? cls.id : null;
  },

  getClassName(id) {
    const cls = schooldb.classes.find(c => c.id === id);
    return cls ? cls.name : null;
  },

  getClassInfoById(id) {
    return schooldb.classes.find(c => c.id === id) || null;
  },

  getSubjectNamesByClassId(classIdOrName) {
    const cls = schooldb.classes.find( c => c.id === classIdOrName || c.name.toLowerCase() === classIdOrName.toLowerCase());
    return cls ? cls.subjects || [] : [];
  },

  getStudentById(id) {
    return schooldb.students.find(stu => stu.id === id) || null;
  },

  getStudentInfoByName(name) {
    return schooldb.students.find(stu => stu.name.toLowerCase() === name.toLowerCase()) || null;
  },

  getStudentInfoById(id) {
    return schooldb.students.find(stu => stu.id === id) || null;
  },

  getSubjectOfAStudentByNameOrId(identifier) {
    const student = schooldb.students.find( stu => stu.id === identifier || stu.name.toLowerCase() === identifier.toLowerCase());
    return student ? student.subjects : null;
  },

  getStudentEnrolledSubjects(studentId) {
    const student = schooldb.students.find(stu => stu.id === studentId);
    return student ? student.subjects : [];
  },

  getStudentAttendance(studentId) {
    const record = schooldb.attendance?.students?.find(a => a.id === studentId);
    return record || null;
  },


  getTeacherInfoByName(name) {
    return schooldb.teachers.find(tea => tea.name.toLowerCase() === name.toLowerCase()) || null;
  },

  getTeacherInfoById(id) {
    return schooldb.teachers.find(tea => tea.id === id) || null;
  },

  getTeachersBySubjectId(subjectId) {
    return schooldb.teachers.filter(tea => tea.subjects.includes(subjectId)) || [];
  },

  getSubjectsByTeacherId(teacherId) {
    const teacher = schooldb.teachers.find(t => t.id === teacherId);
    return teacher ? teacher.subjects : [];
  },

  getTeacherAttendance(teacherId) {
    const record = schooldb.attendance?.teachers?.find(a => a.id === teacherId);
    return record || null;
  },

  
  getEmployeesById(id) {
    return schooldb.employees?.find(emp => emp.id === id) || null;
  },

  getEmployeesByName(name) {
    return schooldb.employees?.find(emp => emp.name.toLowerCase() === name.toLowerCase()) || null;
  },

  getEmployeesRole(id) {
    const emp = schooldb.employees?.find(e => e.id === id);
    return emp ? emp.role : null;
  },

  getEmployeesAttendance(id) {
    const record = schooldb.attendance?.employees?.find(a => a.id === id);
    return record || null;
  },

  getAttendanceByDate(date) {
    return {
      students: schooldb.attendance?.students?.filter(a => a.date === date) || null,
      teachers: schooldb.attendance?.teachers?.filter(a => a.date === date) || null,
      employees: schooldb.attendance?.employees?.filter(a => a.date === date) || null
    };
  }

};


//  Tools List
export const toolsList = [ { description: "Get school information", func: AITool.getSchoolInfo, name: "getSchoolInfo" },
  { description: "Get school by name", func: AITool.getSchoolName, name: "getSchoolName" },
  { description: "Get class by student ID", func: AITool.getClassByStudentId, name: "getClassByStudentId" },
  { description: "Get class by student name", func: AITool.getClassByStudentName, name: "getClassByStudentName" },
  { description: "Get class Id", func: AITool.getClassId, name: "getClassId" },
  { description: "Get class name", func: AITool.getClassName, name: "getClassName" },
  { description: "Get class information by ID", func: AITool.getClassInfoById, name: "getClassInfoById" },
  { description: "Get subject names by class ID or name", func: AITool.getSubjectNamesByClassId, name: "getSubjectNamesByClassId" },
  { description: "Get Student By Id", func: AITool.getStudentById, name: "getStudentById" },
  { description: "Get student information by name", func: AITool.getStudentInfoByName, name: "getStudentInfoByName" },
  { description: "Get student information by ID", func: AITool.getStudentInfoById, name: "getStudentInfoById" },
  { description: "Get subjects of a student by name or ID", func: AITool.getSubjectOfAStudentByNameOrId, name: "getSubjectOfAStudentByNameOrId" },
  { description: "Get student enrolled in which Subjects", func: AITool.getStudentEnrolledSubjects, name: "getStudentEnrolledSubjects" },
  { description: "Get student attendance by ID", func: AITool.getStudentAttendance, name: "getStudentAttendance" },
  { description: "Get teacher information by name", func: AITool.getTeacherInfoByName, name: "getTeacherInfoByName" },
  { description: "Get teacher information by ID", func: AITool.getTeacherInfoById, name: "getTeacherInfoById" },
  { description: "Get teachers by subject ID", func: AITool.getTeachersBySubjectId, name: "getTeachersBySubjectId" },
  { description: "Get subjects by teacher ID", func: AITool.getSubjectsByTeacherId, name: "getSubjectsByTeacherId" },
  { description: "Get teacher attendance by ID", func: AITool.getTeacherAttendance, name: "getTeacherAttendance" },
  { description: "Get employee by ID", func: AITool.getEmployeesById, name: "getEmployeesById" },
  { description: "Get employee by name", func: AITool.getEmployeesByName, name: "getEmployeesByName" },
  { description: "Get employee role by ID", func: AITool.getEmployeesRole, name: "getEmployeesRole" },
  { description: "Get employee attendance by ID", func: AITool.getEmployeesAttendance, name: "getEmployeesAttendance" },
  { description: "Get attendance by date", func: AITool.getAttendanceByDate, name: "getAttendanceByDate" }
];

export default AITool;
