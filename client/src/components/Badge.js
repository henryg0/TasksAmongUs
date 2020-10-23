import React from 'react';
import Badge from 'react-bootstrap/Badge';

export default function CustomBadge(props) {
  let { badgeName } = props;
  if (!badgeName) {
    badgeName = "normie"
  }

  const badges = {
    "normie": <Badge variant="info">NORMIE BOYS</Badge>,

  }

  return (
    <>{badges[badgeName]}</>
  );
}