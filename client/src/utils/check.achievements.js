import axios from 'axios';

export default function checkAchievements(userId, enqueueSnackbar, args) {
  let todoDescription = args["todoDescription"];
  let todoImageUrl = args["todoImageUrl"];
  let todoDate = args["todoDate"];
  let todosCompleted = args["todosCompleted"];
  let friendCount = args["friendCount"];
  let otherFriendCount = args["otherFriendCount"];

  let unlockedBadges = [];
  let unlockedBorders = [];
  let unlockedCelebrations = [];

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
        unlockedBadges.push(keywords[word]);
      }
    }
  }

  // todo imageUrl achievements
  if (todoImageUrl) {
    const keywords = {
      "https://i.imgur.com/epElcfL.jpg": "CHOSEN_ONE",
      "https://i.imgur.com/5i0dn43.jpg": "WOOD",
      "https://i.imgur.com/n3PLKQz.jpg": "DONUT",
      "https://i.imgur.com/vs5wsaE.jpg": "PICKLE",
      "https://i.imgur.com/1TG1tlq.jpg": "MEMER",
    }

    if (todoImageUrl in keywords) {
      unlockedBadges.push(keywords[todoImageUrl]);
    }
  }

  // date related achievments
  if (todoDate) {
    const keywords = {
      9: "HALLOWEENIE",
      10: "THANKFUL",
      11: "SANTA",
    }
    unlockedBadges.push(keywords[new Date().getMonth()]);
  }

  // total todosCompleted

  if (todosCompleted) {
    if (todosCompleted >= 1) {
      unlockedBorders.push("SEAWEED_GREEN");
    }
    if (todosCompleted >= 3) {
      unlockedBorders.push("OCEAN_BLUE");
    }
    if (todosCompleted >= 5) {
      unlockedCelebrations.push("FALL_GUYS_CROWN");
    }
    if (todosCompleted >= 7) {
      unlockedBadges.push("007");
    }
    if (todosCompleted >= 10) {
      unlockedCelebrations.push("SUPER_SAIYAN");
    }
    if (todosCompleted >= 20) {
      unlockedBorders.push("PUMPKIN_ORANGE");
    }
    if (todosCompleted >= 30) {
      unlockedCelebrations.push("WAKANDA");
    }
    if (todosCompleted >= 50) {
      unlockedBadges.push("EPIC");
    }
    if (todosCompleted >= 75) {
      unlockedBadges.push("TRYHARD");
    }
  }

  // friend count achievements
  if (friendCount) {
    if (friendCount >= 1) {
      unlockedBorders.push("VIOLET_FADE");
    }
    if (friendCount >= 3) {
      unlockedBorders.push("SUNFLOWER_ORANGE");
    }
    if (friendCount >= 5) {
      unlockedCelebrations.push("STEVE_ULT");
    }
    if (friendCount >= 8) {
      unlockedCelebrations.push("FALL_GUYS_DANCE");
    }
    if (friendCount >= 10) {
      unlockedBadges.push("FRIENDINATOR");
    }
  }

  if (otherFriendCount) {
    if (otherFriendCount >= 1) {
      unlockedBorders.push("VIOLET_FADE");
    }
    if (otherFriendCount >= 3) {
      unlockedBorders.push("SUNFLOWER_ORANGE");
    }
    if (otherFriendCount >= 5) {
      unlockedCelebrations.push("STEVE_ULT");
    }
    if (otherFriendCount >= 8) {
      unlockedCelebrations.push("FALL_GUYS_DANCE");
    }
    if (otherFriendCount >= 10) {
      unlockedBadges.push("FRIENDINATOR");
    }

    if (Object.keys(unlockedBadges).length > 0) {
      axios.put(`/api/user/${userId}/unlocked/badges/update`, {"unlockedBadges": unlockedBadges})
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        })
    }  
    
    if (Object.keys(unlockedBorders).length > 0) {
      axios.put(`/api/user/${userId}/unlocked/borders/update`, {"unlockedBorders": unlockedBorders})
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        })
    }
  
    if (Object.keys(unlockedCelebrations).length > 0) {
      axios.put(`/api/user/${userId}/unlocked/celebrations/update`, {"unlockedCelebrations": unlockedCelebrations})
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        })
    }
    return;
  }


  // done checking

  if (Object.keys(unlockedBadges).length > 0) {
    axios.put(`/api/user/${userId}/unlocked/badges/update`, {"unlockedBadges": unlockedBadges})
      .then((res) => {
        for (let i = 0; i < res.data.msg.length; i++) {
          const msg = res.data.msg[i].replace(/_/g, ' ');
          enqueueSnackbar(msg + " Customization Unlocked!!", {variant: "info"});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }  
  
  if (Object.keys(unlockedBorders).length > 0) {
    axios.put(`/api/user/${userId}/unlocked/borders/update`, {"unlockedBorders": unlockedBorders})
      .then((res) => {
        for (let i=0; i < res.data.msg.length; i++) {
          const msg = res.data.msg[i].replace(/_/g, ' ');
          enqueueSnackbar(msg + " Customization Unlocked!!", {variant: "info"});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  if (Object.keys(unlockedCelebrations).length > 0) {
    axios.put(`/api/user/${userId}/unlocked/celebrations/update`, {"unlockedCelebrations": unlockedCelebrations})
      .then((res) => {
        for (let i=0; i < res.data.msg.length; i++) {
          const msg = res.data.msg[i].replace(/_/g, ' ');
          enqueueSnackbar(msg + " Customization Unlocked!!", {variant: "info"});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

return (
    [unlockedBadges, unlockedBorders, unlockedCelebrations]
  )
}