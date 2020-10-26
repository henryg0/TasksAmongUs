import React from 'react';
import Badge from 'react-bootstrap/Badge';

export default function getBadges() {
  return {
    "normie": [<Badge variant="info">NORMIE</Badge>, "Awarded for making an account"],
    
    "007": [<Badge variant="danger">007</Badge>, "Awarded for completing 7 todos"],
    "epic": [<Badge variant="dark">EPIC</Badge>, "Awarded for completing 50 todos"],
    "flexer": [<Badge variant="light">FLEXER</Badge>, "Awarded for completing 75 todos"],
    "friendinator": [<Badge variant="light">FRIENDINATOR</Badge>, "Awarded for friending 10 people"],
    
    
    "swole": [<Badge variant="success">SWOLE</Badge>, "???"],
    "scholar": [<Badge variant="secondary">SCHOLAR</Badge>, "???"],
    "hacker": [<Badge variant="danger">HACKER</Badge>, "???"],
    "gamer": [<Badge variant="primary">GAMER</Badge>, "???"],
    "shinobi": [<Badge variant="dark">SHINOBI</Badge>, "???"],
    "baller": [<Badge variant="danger">BALLER</Badge>, "???"],
    "chosen-one": [<Badge variant="primary">CHOSEN ONE</Badge>, "???"],
    "wood": [<Badge variant="warning">WOOD</Badge>, "???"],
    "donut": [<Badge variant="info">DONUT</Badge>, "???"],
    "pickle": [<Badge variant="success">PICKLE</Badge>, "???"],
    "memer": [<Badge variant="warning">MEMER</Badge>, "???"],
    // "lucky-clover": [<Badge variant="success">LUCKY CLOVER</Badge>, "???"],
    // "joker": [<Badge variant="light">JOKER</Badge>, "???"],
    // "may-day": [<Badge variant="danger">MAYDAY</Badge>, "???"],
    
    "halloweenie": [<Badge variant="danger">HALLOWEENIE</Badge>, "Awarded for making a todo in October"],
    "thankful": [<Badge variant="primary">THANKFUL</Badge>, "Awarded for making a todo in November"],
    "santa": [<Badge variant="success">SANTA</Badge>, "Awarded for making a todo in December"],
    
    "legendary": [<Badge variant="primary">LEGENDARY</Badge>, "Awarded for making an account during launch of TasksAmongUs <3"],
    "mod": [<Badge variant="dark">MOD</Badge>, "Awarded for app developers"],

    "none": [<br/>, ""]
  }
}