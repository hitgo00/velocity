// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  useMediaQuery,
  Typography,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';

import { IconPlus } from '@tabler/icons';

// project imports
import MenuList from './MenuList';

const drawerWidth = 260;

const LogoSection = () => (
  <div className="flex-shrink-0 mr-4">
    <Link to="/" className="block flex space-x-2 " aria-label="Cruip">
      <svg
        className="w-8 h-8"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            cx="21.152%"
            cy="86.063%"
            fx="21.152%"
            fy="86.063%"
            r="79.941%"
            id="header-logo"
          >
            <stop stopColor="#4FD1C5" offset="0%" />
            <stop stopColor="#81E6D9" offset="25.871%" />
            <stop stopColor="#338CF5" offset="100%" />
          </radialGradient>
        </defs>
        <rect
          width="32"
          height="32"
          rx="16"
          fill="url(#header-logo)"
          fillRule="nonzero"
        />
      </svg>

      <Typography variant="h4"> Velocity 🚀</Typography>
    </Link>
  </div>
);

const Sidebar = ({ onAddLesson }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          className="relative"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '16px',
          }}
        >
          <MenuList />
          <Box className="absolute bottom-0">
            <ListItemButton
              sx={{
                borderRadius: `${8}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: 'inherit',
                py: 1.25,
                pl: `24px`,
              }}
              selected={false}
              onClick={onAddLesson}
            >
              <ListItemIcon sx={{ my: 'auto', minWidth: 36 }}>
                <IconPlus />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={'h5'} color="inherit">
                    {'Add Lesson'}
                  </Typography>
                }
              />
            </ListItemButton>
          </Box>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
    >
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open
        className="border border-r"
        // onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            // borderRight: 'none',
            // [theme.breakpoints.up('md')]: {
            //   top: '88px',
            // },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
