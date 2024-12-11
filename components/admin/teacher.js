import { useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import AddTeacherModal from './addteacher'; // Make sure to import your modal component
import useFacultyGroupCourseData from './useFacultyGroupCourseData';

function TeacherSection({ teachers }) {
  const [showModal, setShowModal] = useState(false);

  // Fetch faculties, courses, groups, and stats
  const { faculties, courses, groups, facultyCourseGroupStats } = useFacultyGroupCourseData();

  const handleAddTeacherClick = () => {
    setShowModal(true);
  };

  return (
    <section className="bg-white shadow-md p-6 mb-6 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Teachers</h2>
        <button
          onClick={handleAddTeacherClick}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
        >
          Add Teacher
        </button>
      </div>
      <ul className="space-y-4">
        {teachers.map((teacher, index) => (
          <li
            key={index}
            className="bg-gray-50 border rounded-md p-4 flex items-center gap-4 shadow-sm hover:shadow-lg transition"
          >
            {/* Teacher Info */}
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{teacher?.name || 'No Name'}</h3>
              <p className="text-sm text-gray-500 mb-2">Subject: {teacher?.subject || 'Not Assigned'}</p>
              <div className="text-sm text-gray-600">
                Groups: <span className="font-medium">{teacher?.groups?.join(', ') || 'No Groups'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition">
                <Edit />
                <span className="text-sm font-medium">Edit</span>
              </button>
              <button className="flex items-center gap-1 text-red-600 hover:text-red-700 transition">
                <Delete />
                <span className="text-sm font-medium">Delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Teacher Modal */}
      {showModal && (
        <AddTeacherModal
          faculties={faculties}
          courses={courses}
          groups={groups}
          facultyCourseGroupStats={facultyCourseGroupStats}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}

export default TeacherSection;
