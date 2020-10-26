import React from 'react';
import Badge from 'react-bootstrap/Badge';

export default function getBadges() {
  return {
    "NORMIE": [<Badge variant="info">NORMIE</Badge>, "Awarded for making an account"],
    
    "007": [<Badge variant="danger">007</Badge>, "Awarded for completing 7 todos"],
    "EPIC": [<Badge variant="dark">EPIC</Badge>, "Awarded for completing 50 todos"],
    "FLEXER": [<Badge variant="light">FLEXER</Badge>, "Awarded for completing 75 todos"],
    "FRIENDINATOR": [<Badge variant="light">FRIENDINATOR</Badge>, "Awarded for friending 10 people"],
    
    
    "SWOLE": [<Badge variant="success">SWOLE</Badge>, "???"],
    "SCHOLAR": [<Badge variant="secondary">SCHOLAR</Badge>, "???"],
    "HACKER": [<Badge variant="danger">HACKER</Badge>, "???"],
    "GAMER": [<Badge variant="primary">GAMER</Badge>, "???"],
    "SHINOBI": [<Badge variant="dark">SHINOBI</Badge>, "???"],
    "BALLER": [<Badge variant="danger">BALLER</Badge>, "???"],
    "CHOSEN ONE": [<Badge variant="primary">CHOSEN ONE</Badge>, "???"],
    "WOOD": [<Badge variant="warning">WOOD</Badge>, "???"],
    "DONUT": [<Badge variant="info">DONUT</Badge>, "???"],
    "PICKLE": [<Badge variant="success">PICKLE</Badge>, "???"],
    "MEMER": [<Badge variant="warning">MEMER</Badge>, "???"],
    // "lucky-clover": [<Badge variant="success">LUCKY CLOVER</Badge>, "???"],
    // "joker": [<Badge variant="light">JOKER</Badge>, "???"],
    // "may-day": [<Badge variant="danger">MAYDAY</Badge>, "???"],
    
    "HALLOWEENIE": [<Badge variant="danger">HALLOWEENIE</Badge>, "Awarded for making a todo in October"],
    "THANKFUL": [<Badge variant="primary">THANKFUL</Badge>, "Awarded for making a todo in November"],
    "SANTA": [<Badge variant="success">SANTA</Badge>, "Awarded for making a todo in December"],
    
    "LEGENDARY": [<Badge variant="primary">LEGENDARY</Badge>, "Awarded for making an account during launch of TasksAmongUs <3"],
    "MOD": [<Badge variant="dark">MOD</Badge>, "Awarded for app developers"],

    "none": [<br/>, ""]
  }
}