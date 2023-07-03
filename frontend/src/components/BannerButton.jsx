import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';

const BannerButton = ({ action }) => {

  const image =
  {
    url: 'https://i0.wp.com/dabarlaw.com/wp-content/uploads/2020/01/united-states-flag-wallpaper-pictures-hd-50579-52271-hd-wallpapers.jpg?ssl=1',
    title: 'Enter',
    width: '100%',
  };

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      // Overrides inline-style
      width: '100% !important',
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

  return (
    <>
      <ImageButton
        focusRipple
        key={image.title}
        style={{
          height: '40vh',
          width: image.width,
        }}
        onClick={action}
      >
        <ImageSrc
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundColor: '#cccccc',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
          }} />
        <ImageBackdrop className="welcome-backdrop" />
        <Image>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={{
              position: 'relative',
              p: 4,
              pt: 2,
              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
            }}
          >
            {image.title}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </Image>
      </ImageButton>
    </>
  );

};

BannerButton.propTypes = {
  action: PropTypes.func,
};

export default BannerButton;