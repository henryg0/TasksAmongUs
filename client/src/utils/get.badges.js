import React from 'react';
import Badge from 'react-bootstrap/Badge';

export default function getBadges() {
  return {
    "NORMIE": <Badge variant="info">NORMIE</Badge>,
    
    "007": <Badge variant="danger">007</Badge>,
    "EPIC": <Badge variant="dark">EPIC</Badge>,
    "FLEXER": <Badge variant="light">FLEXER</Badge>,
    "FRIENDINATOR": <Badge variant="light">FRIENDINATOR</Badge>,
    
    
    "SWOLE": <Badge variant="success">SWOLE</Badge>,
    "SCHOLAR": <Badge variant="secondary">SCHOLAR</Badge>,
    "HACKER": <Badge variant="danger">HACKER</Badge>,
    "GAMER": <Badge variant="primary">GAMER</Badge>,
    "SHINOBI": <Badge variant="dark">SHINOBI</Badge>,
    "BALLER": <Badge variant="danger">BALLER</Badge>,
    "CHOSEN ONE": <Badge variant="primary">CHOSEN ONE</Badge>,
    "WOOD": <Badge variant="warning">WOOD</Badge>,
    "DONUT": <Badge variant="info">DONUT</Badge>,
    "PICKLE": <Badge variant="success">PICKLE</Badge>,
    "MEMER": <Badge variant="warning">MEMER</Badge>,
    // "lucky-clover": <Badge variant="success">LUCKY CLOVER</Badge>,
    // "joker": <Badge variant="light">JOKER</Badge>,
    // "may-day": <Badge variant="danger">MAYDAY</Badge>,
    
    "HALLOWEENIE": <Badge variant="danger">HALLOWEENIE</Badge>,
    "THANKFUL": <Badge variant="primary">THANKFUL</Badge>,
    "SANTA": <Badge variant="success">SANTA</Badge>,
    
    "SUPPORT <3": <Badge variant="primary">SUPPORT {"<3"}</Badge>,
    "GOD": <Badge variant="danger">GOD</Badge>,

    "none": <br/>,
  }
}