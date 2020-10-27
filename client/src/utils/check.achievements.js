import axios from 'axios';

export default function checkAchievements(userId, enqueueSnackbar, args) {
  let todoDescription = args["todoDescription"];
  let todoImageUrl = args["todoImageUrl"];

  let unlockedBadges = {};
  let unlockedBorders = {};
  let unlockedCelebrations = {};

  // todo description keywords achievements
  if (todoDescription) {
    const keywords = {
      "LIFT": "SWOLE",
      "LIFTING": "SWOLE",
      "WEIGHTS": "SWOLE",
      "GYM": "SWOLE",

      "STUDY": "SCHOLAR",
      "STUDYING": "SCHOLAR",
      "HOMEWORK": "HOMEWORK",

      "BUG": "HACKER",
      "BUGS": "HACKER",
      "SOFTWARE": "HACKER",
      "PROGRAMING": "HACKER",

      "GAMES": "GAMER",
      "GAME": "GAMER",

      "ANIME": "SHINOBI",

      "MONEY": "BALLER",
      "BILLS": "BALLER",
    }
    let words = {};
    todoDescription = todoDescription.toUpperCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "").split(" ");
    for (const i in todoDescription) {
      words[todoDescription[i]] = true;
    }
    for (const word in words) {
      if (word in keywords) {
        unlockedBadges[keywords[word]] = true;
      }
    }
  }

  // todo imageUrl achievements
  if (todoImageUrl) {
    const keywords = {
      "https://i.imgur.com/epElcfL.jpg": "CHOSEN ONE",
      "https://i.imgur.com/5i0dn43.jpg": "WOOD",
      "https://i.imgur.com/n3PLKQz.jpg": "DONUT",
      "https://i.imgur.com/vs5wsaE.jpg": "PICKLE",
      "https://i.imgur.com/1TG1tlq.jpg": "MEMER",
    }

    if (todoImageUrl in keywords) {
      unlockedBadges[keywords[todoImageUrl]] = true;
    }
  }



  // done checking

  if (Object.keys(unlockedBadges).length > 0) {
    axios.put(`/api/user/${userId}/unlocked/badges/update`, {"unlockedBadges": unlockedBadges})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }  
  
  if (Object.keys(unlockedBorders).length > 0) {
    axios.put(`/api/user/${userId}/unlocked/borders/update`, {"unlockedBorders": unlockedBorders})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  if (Object.keys(unlockedCelebrations).length > 0) {
    axios.put(`/api/user/${userId}/unlocked/celebrations/update`, {"unlockedCelebrations": unlockedCelebrations})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}