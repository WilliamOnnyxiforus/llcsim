import React, { useState } from 'react';
import HomePageLayout from '../components/layouts/homePageLayout';
import { Typography } from '@mui/material';

function Home(props) {
  const pathname = '/home';

  return (
    <HomePageLayout>
      <Typography>This is Dashboard Page</Typography>
    </HomePageLayout>
  );
}

export default Home;