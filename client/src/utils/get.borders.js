import { useGradientAvatarStyles } from '@mui-treasury/styles/avatar/gradient';

export default function Border() {
  return {
    "black": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: 'black',
      }), "Awarded for making an account"
    ],
    "greenBlue": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#03B2A2',
      }), "Awarded for completing 1 todo"
    ],
    "oceanBlue": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#04A0D3',
      }), "Awarded for completing 3 todos"
    ],
    "darkOrange": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#DF665A',
      }), "Awarded for completing 20 todos"
    ],
    "rainbowViolet": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: 'linear-gradient(to bottom right, #feac5e, #c779d0, #4bc0c8)',
      }), "Awarded for adding a friend"
    ],
    "lightOrange": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#F4B26A',
      }), "Awarded for adding 3 friends"
    ],
    "none": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: 'white',
      }), ""
    ],
  }
}