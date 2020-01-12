import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
  <ButtonGroup size="large" aria-label="medium outlined button group">
    <Button>
      {children}
    </Button>
    
  </ButtonGroup>
  
);

export default CustomButton;
