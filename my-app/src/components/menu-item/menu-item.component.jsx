import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (

    <div className='menu-item'>
      
          <Card className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
              <div
              className='background-image'
              style={{
                backgroundImage: `url(${imageUrl})`
              }} 
              />
                {/* <div className='content'>
                  <h1 className='title'>{title.toUpperCase()}</h1>
                  <span className='subtitle'>SHOP NOW</span>
                </div> */} 
                
                <Button variant="outlined" className='content'>{title.toUpperCase()}</Button>
                
                
            
          </Card>
        
        
      
    </div>
      
  
)

export default withRouter(MenuItem);
