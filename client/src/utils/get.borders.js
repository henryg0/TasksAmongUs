import { useGradientAvatarStyles } from '@mui-treasury/styles/avatar/gradient';

export default function Border() {
  return {
    "BLACK": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: 'black',
      }), "Awarded for making an account"
    ],
    "SEAWEED GREEN": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#03B2A2',
      }), "Awarded for completing 1 todo"
    ],
    "OCEAN BLUE": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#04A0D3',
      }), "Awarded for completing 3 todos"
    ],
    "PUMPKIN ORANGE": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#DF665A',
      }), "Awarded for completing 20 todos"
    ],
    "VIOLET FADE": [
      useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: 'linear-gradient(to bottom right, #feac5e, #c779d0, #4bc0c8)',
      }), "Awarded for adding a friend"
    ],
    "SUNFLOWER ORANGE": [
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