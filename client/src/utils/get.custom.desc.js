export function getCustomDesc() {
  return {
    "BLACK": "Awarded for creating an account",
    "NORMIE": "Awarded for creating an account",
    "AMONG US WIN": "Awarded for creating an account",

    "SEAWEED GREEN": "Awarded for completing 1 todo",
    "OCEAN BLUE": "Awarded for completing 3 todo",
    "FALL GUYS CROWN": "Awarded for completing 5 todo",
    "007": "Awarded for completing 7 todos",
    "SUPER SAIYAN": "Awarded for completing 10 todo",
    "PUMPKIN ORANGE": "Awarded for completing 20 todo",
    "WAKANDA": "Awarded for completing 30 todo",
    "EPIC": "Awarded for completing 50 todo",
    "FLEXER": "Awarded for completing 75 todo",

    "SWOLE": "Awarded for creating a todo relating to lifting or the gym",
    "SCHOLAR": "Awarded for creating a todo relating to studying or homework",
    "HACKER": "Awarded for creating a todo relating to programming",
    "GAMER": "Awarded for creating a todo relating to games",
    "SHINOBI": "Awarded for creating a todo relating to anime",
    "BALLER": "Awarded for creating a todo relating to money",

    "VIOLET FADE": "Awarded for adding 1 friend ",
    "SUNFLOWER ORANGE": "Awarded for adding 3 friend ",
    "STEVE ULT": "Awarded for adding 5 friend ",
    "FALL GUYS DANCE": "Awarded for adding 8 friend ",
    "FRIENDINATOR": "Awarded for adding 10 friend ",

    "CHOSEN ONE": "Awarded for creating a todo with the chosen one meme",
    "WOOD": "Awarded for creating a todo with the league of wood meme",
    "DONUT": "Awarded for creating a todo with the D'OH meme",
    "PICKLE": "Awarded for creating a todo with the pickle Rick meme",
    "MEMER": "Awarded for creating a todo with the sPOnGEBoB meme",

    "HALLOWEENIE": "Awarded for creating a todo in October",
    "THANKFUL": "Awarded for creating a todo in November",
    "SANTA": "Awarded for creating a todo in December",

    "SUPPORT <3": "Awarded for creating an account during app's launch",
    "GOD": "Awarded for contributing to the app",
  };
}

export function getSecretCustomDesc() {
  const descriptions = getCustomDesc();
  const secrets = [
    "SWOLE",
    "SCHOLAR",
    "HACKER",
    "GAMER",
    "SHINOBI",
    "BALLER",

    "CHOSEN ONE",
    "WOOD",
    "DONUT",
    "PICKLE",
    "MEMER",
  ];
  for (const i in secrets) {
    descriptions[secrets[i]] = "???";
  }
  return descriptions;
}