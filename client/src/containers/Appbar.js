import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TwitterIcon from '@material-ui/icons/Twitter';
import FaceIcon from '@material-ui/icons/Face';
import history from '../history';



export default function PrimarySearchAppBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab onClick={() => history.push('/twitter')} icon={<TwitterIcon />} />
        <Tab onClick={() => history.push('/TwitterFollowers')} icon={<FaceIcon />} />
        
      </Tabs>
    </>
  );
}
