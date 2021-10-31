import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useCourseContext } from '../../components/context/CourseContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';



const CourseLodaingPage = (props) => {
  const { courseId } = props.match.params;

  const { setCourse } = useCourseContext();
  const history = useHistory();

  console.log(setCourse, courseId);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}getCourse/${courseId}`)
      .then((result) => {
        const course = result.data;
        // console.log(course);
        if (course && course.lessons.length) {
          setCourse(course);
          const lessonId = course.lessons[0]._id;
          const link = `/course/${courseId}/lesson/${lessonId}`;
          history.replace(link);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId, history, setCourse]);

  return <CircularProgress className="absolute" />;
};

export default CourseLodaingPage;
