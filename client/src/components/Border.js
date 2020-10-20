import React from 'react';
import { useGradientAvatarStyles } from '@mui-treasury/styles/avatar/gradient';

export default function Border(props) {
  let { borderName, borderThickness } = props;
  if (!borderName) {
    borderName = "black";
  }
  if (!borderThickness) {
    borderThickness = 3;
  }

  let borderStyles = {
    "black": useGradientAvatarStyles({
      gap: 2,
      thickness: borderThickness,
      gapColor: 'white',
      color: 'black',
    }),
    "rainbowViolet": useGradientAvatarStyles({
      gap: 2,
      thickness: borderThickness,
      gapColor: 'white',
      color: 'linear-gradient(to bottom right, #feac5e, #c779d0, #4bc0c8)',
    }),
    "darkOrange": useGradientAvatarStyles({
      gap: 2,
      thickness: borderThickness,
      gapColor: 'white',
      color: '#FA8352',
    }),
    "pastelBlue": useGradientAvatarStyles({
      gap: 2,
      thickness: borderThickness,
      gapColor: 'white',
      color: '#A2DDFF',
    }),
    "pastelPurple": useGradientAvatarStyles({
      gap: 2,
      thickness: borderThickness,
      gapColor: 'white',
      color: '#AABDFC',
    }),
  }
  
  return (
    <div className={borderStyles[borderName].root}>
      {props.children}
    </div>
  );
}