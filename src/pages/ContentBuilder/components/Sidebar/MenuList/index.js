// project imports
import NavGroup from './NavGroup';
import { useCourseContext } from '../../../../../components/context/CourseContext';
import { IconNotebook } from '@tabler/icons';

const MenuList = () => {
  const { course } = useCourseContext();
  if (!course) {
    return null;
  }

  const item = {
    id: course._id,
    title: course.name,
    type: 'group',
    children: course.lessons.map((lesson) => ({
      id: lesson._id,
      courseId: course._id,
      title: lesson.title,
      type: 'item',
      url: '/utils/util-shadow',
      icon: IconNotebook,
      breadcrumbs: false,
    })),
  };

  return <NavGroup key={item.id} item={item} />;
};

export default MenuList;
