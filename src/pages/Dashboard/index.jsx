import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const card = (
  <React.Fragment>
    {/* <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent> */}
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

function Dashboard() {
  // const courses = localStorage.getItem('courses_created') || []
  // const courses = [
  //   {name: 'Course 1', _id: 'abcdcadkjfbsjv', coursesCreated: []},
  //   {name: 'Course 2', _id: 'dlvjaljndfiovb', coursesCreated: []},
  //   {name: 'Course 3', _id: 'sfkbhjvsafvoin', coursesCreated: []},
  //   {name: 'Course 4', _id: 'sdiouwbvhfvnui', coursesCreated: []},
  //   {name: 'Course 5', _id: 'sijbvsiovbdkjc', coursesCreated: []},
  //   {name: 'Course 6', _id: 'skdvljnsaijnff', coursesCreated: []},
  // ];
  const history = useHistory();

  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get(`${SERVER_URL}listallcourses/`).then(result => {
      console.log(result.data);
      setCourses(result.data)
    })
  }, [])

  return (
    <>
      <AppBar position="static" sx={{mb:5}}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Courses
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {/* <Box sx={{ minWidth: 35, maxWidth: 1000, maxHeight: 30 }}> */}
        <Grid container justify="center" textAlign="center" spacing={5}>
          {courses.map((course) => (
            <Grid item>
              <Card variant="outlined" sx={{ maxWidth: 200 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://picsum.photos/200/300"
                  alt="random pic"
                />
                {/* <Typography variant="h5" component="div">
                  {course}
                </Typography>
                <CardActions>
                  <Button size="small" component={Link} to={`/courses/${course}/view`}>View</Button>
                  <Button size="small" component={Link} to={`/courses/${course}/edit`}>Edit</Button>
                </CardActions> */}
                <CardActions>
                  <Button size="small" component={Link} to={`/course/${course._id}`}>{course.name}</Button>
                </CardActions>
              </Card>
            </Grid> 
          ))} 

            <Grid item>
              <Card variant="outlined" sx={{ maxWidth: 200 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cdn.icon-icons.com/icons2/902/PNG/512/plus_icon-icons.com_69322.png"
                  alt="random pic"
                />
                {/* <Typography variant="h5" component="div">
                  {course}
                </Typography>
                <CardActions>
                  <Button size="small" component={Link} to={`/courses/${course}/view`}>View</Button>
                  <Button size="small" component={Link} to={`/courses/${course}/edit`}>Edit</Button>
                </CardActions> */}
                <CardActions>
                  <Button size="small" onClick={() => {
                      axios.post(`${SERVER_URL}course`, { name: 'Untitled Course' }).then(response => {
                        console.log(response);
                        history.push(`/course/${response.data._id}`)
                      })
                  }} >Create New Course</Button>
                </CardActions>
              </Card>
            </Grid> 

        </Grid>
      </Container>
      {/* </Box> */}
    </>
  );
}

export default Dashboard;
