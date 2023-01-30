import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';
import React from 'react';
import { Container } from '@mui/system';

function SkeletonComponent() {

    const skeletonArray = [1,2,3,4,5,6,7,8,9,10,11,12] 

return (
    // <Container maxWidth='lg'>
    <Grid container spacing={3} sx={{width: '100vw'}} >
        {skeletonArray.map((item) => (
            <Grid item key={item} xs={12} sm={6} md={3} >
            <Card >
                <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />

                <CardContent>
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                </CardContent>
            </Card>
            </Grid>
        ))}
        
    </Grid>
    // </Container>

    
);
}

export default SkeletonComponent;
