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

const Home = async () => {
    const jobQueries = await getJobs();

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
          { jobQueries.map((job, index) => (
              <Grid key={`${job}-${index}`} item xs={4}>
                <Zoom in style={{ transitionDelay: `${125 * (index + 1)}ms`}}>
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

const getJobs = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/index', { cache: 'force-cache' })

      if (!res.ok) {
        throw new Error('Fetch failed with non-OK status');
      }

      return res.json();

    } catch (error) {
      console.error('Fetch error:', error);
      return undefined; 
    }
};


export default Home;