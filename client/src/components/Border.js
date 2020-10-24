import React from 'react';
import { useGradientAvatarStyles } from '@mui-treasury/styles/avatar/gradient';

export default function Border(props) {

  let borderStyles = {
    "black": useGradientAvatarStyles({
      gap: 2,
      thickness: 3,
      gapColor: 'white',
      color: 'black',
    })
  }
  
  return (
    <div className={borderStyles["black"].root}>
      {props.children}
    </div>
  );
}