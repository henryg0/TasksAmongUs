import React from 'react';
import Badge from 'react-bootstrap/Badge';

export default function CustomBadge(props) {
  let { badgeName, size } = props;
  if (!badgeName) {
    badgeName = "normie"
  }

  return (
    <Badge variant="dark">MOD</Badge>
  );
}

