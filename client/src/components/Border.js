import React from 'react';

import { useGradientAvatarStyles } from '@mui-treasury/styles/avatar/gradient';

export default function GradientAvatar(props) {
  const styles = useGradientAvatarStyles({
    gap: 2,
    thickness: 3,
    gapColor: '#f4f7fa',
    color: 'linear-gradient(to bottom right, #feac5e, #c779d0, #4bc0c8)',
  });
  return (
    <>
      <div className={styles.root}>
        {props.children}
      </div>
    </>
  );
}