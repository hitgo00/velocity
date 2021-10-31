import React, { useState } from 'react';
import axios from 'axios';

const CourseContext = React.createContext();

function CourseProvider({ children }) {
  const [course, setCourse] = useState(null);

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

function useCourseContext() {
  var context = React.useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a UserProvider');
  }
  return context;
}

export { CourseContext, CourseProvider, useCourseContext };
