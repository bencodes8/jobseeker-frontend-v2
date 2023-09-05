import * as React from 'react';
import { 
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade, 
  Grid,
  Paper, 
  Typography,
  Zoom
} from '@mui/material';

const BACKEND = "http://127.0.0.1:8000/api";

const Home = async () => {
  const jobQueries = await getData();

  return (
    <Box sx={{ display: 'flex', 
              flexDirection: 'column', 
              height: '100%' 
            }}
    >
      <Box sx={{ textAlign: 'center', boxSizing: 'border-box', padding: 2 }}>
        <Fade in timeout={2000}>
          <Typography variant="h4">Welcome to Jobseeker</Typography>
        </Fade>
        <Fade in style={{ transitionDelay: '500ms' }} timeout={2000}>
          <Typography variant="subtitle1" sx={{ marginTop: 1 }}>Seeking a job? Click on a card for a quick search.</Typography>
        </Fade>
      </Box>
      <Grid container rowSpacing={1} sx={{ flexGrow: 1, marginTop: 1 }}>
        {jobQueries.map((job) => (
            <Grid item xs={4}>
              <Zoom in>
                <Card sx={{ maxWidth: 325, margin: 'auto' }}>
                  <Paper elevation={4}>
                    <CardActionArea>
                      <CardMedia 
                        component="img"
                        height="150"
                        image={`http://127.0.0.1:8000/${job.image}`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                          {job.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Paper>
                </Card>
              </Zoom>
            </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const getData = async () => {
  const res = await fetch(`${BACKEND}/index`, { cache: 'force-cache' })

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default Home;