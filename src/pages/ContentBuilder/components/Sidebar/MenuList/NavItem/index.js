import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// material-ui
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const NavItem = ({ item, level }) => {
  const history = useHistory();
  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3em" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: 8,
        height: 8,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <ListItemButton
      disabled={item.disabled}
      sx={{
        borderRadius: `${8}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={false}
      onClick={() => {
        history.push(`/course/${item.courseId}/lesson/${item.id}`);
        history.go();
      }}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={'h6'} color="inherit">
            {item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
