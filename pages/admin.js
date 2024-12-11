import { useState } from "react";
import Header from "@/components/admin/header";
import TeacherSection from "@/components/admin/teacher";
import StudentSection from "@/components/admin/student";

function AdminPage() {
  const [teachers, setTeachers] = useState(["John Doe", "Jane Smith", "Alice Johnson"]);
  const [students, setStudents] = useState({
    faculty1: {
      courses: {
        course1: {
          groups: {
            group1: ["Student A", "Student B"],
            group2: ["Student C", "Student D"],
          },
        },
        course2: {
          groups: {
            group1: ["Student E", "Student F"],
          },
        },
      },
    },
    faculty2: {
      courses: {
        course1: {
          groups: {
            group1: ["Student G", "Student H"],
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <TeacherSection teachers={teachers} />
      <StudentSection students={students} />
    </div>
  );
}

export default AdminPage;
