import React from 'react';
import authenticate from '../../utils/authenticate';
import getBadges from '../../utils/get.badges';
import getBorders from '../../utils/get.borders';
import getCelebrations from '../../utils/get.celebrations';
import { getCustomDesc, getSecretCustomDesc } from '../../utils/get.custom.desc';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

const description = getCustomDesc();
const secretDescriptions = getSecretCustomDesc();

export function displayBadges(unlockedBadges) {
  let badges = getBadges();
  let result = [];
  for (let badge in badges) {
    if (badge in unlockedBadges) {
      result.push(
        <FormControlLabel value={badge} control={<Radio style={{color: "red"}} />} key={badge} label={
          <Tooltip title={description[badge]} placement="bottom-start">
            {badges[badge]}
          </Tooltip>
        }/>
      )
    } else {
      result.push(
        <FormControlLabel value={badge} control={<Radio disabled style={{color: "secondary"}} />} key={badge} label={
          <Tooltip title={"LOCKED: " + secretDescriptions[badge]} placement="bottom-start">
            {badges[badge]}
          </Tooltip>
        }/>
      )
    }
  }
  result = result.slice(0, -1);
  return result;
}

export function displayBorders(unlockedBorders) {
  let user = authenticate();
  let borders = getBorders();
  let result = [];
  for (let border in borders) {
    if (border in unlockedBorders) {
      result.push(
        <FormControlLabel value={border} control={<Radio style={{color: "red"}} />} key={border} label={
          <Tooltip title={description[border]} placement="bottom-start">
            <div className={borders[border].root}>
              <Avatar src={user.imageUrl} style={{width: "50px", height: "50px"}} />
            </div>
          </Tooltip>
        }/>
      )
    } else {
      result.push(
        <FormControlLabel value={border} control={<Radio disabled style={{color: "secondary"}} />} key={border} label={
          <Tooltip title={"LOCKED: " + secretDescriptions[border]} placement="bottom-start">
            <div className={borders[border].root}>
              <Avatar src={user.imageUrl} style={{width: "50px", height: "50px"}} />
            </div>
          </Tooltip>
        }/>
      )
    }
  }
  result = result.slice(0, -1);
  return result;
}

export function displayCelebrations(unlockedCelebrations) {
  let celebrations = getCelebrations();
  let result = [];
  for (let celebration in celebrations) {
    if (celebration in unlockedCelebrations) {
      result.push(
        <FormControlLabel value={celebration} control={<Radio style={{color: "red"}} />} key={celebration} label={
          <Tooltip title={description[celebration]} placement="bottom-start">
            <video autoPlay muted loop playsInline width="260px">
              <source src={celebrations[celebration]} type="video/mp4" />
            </video>
          </Tooltip>
        }/>
      )
    } else {
      result.push(
        <FormControlLabel value={celebration} control={<Radio disabled style={{color: "secondary"}} />} key={celebration} label={
          <Tooltip title={"LOCKED: " + secretDescriptions[celebration]} placement="bottom-start">
            <video autoPlay muted loop playsInline width="260px">
              <source src={celebrations[celebration]} type="video/mp4" />
            </video>
          </Tooltip>
        }/>
      )
    }
  }
  return result;
}