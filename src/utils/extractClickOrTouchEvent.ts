import React from 'react';
export const extractClickOrTouchEvent = (
  e: React.MouseEvent | React.TouchEvent,
  parent?: string
) => {
  let x = 0,
    y = 0;

  const offset = parent
    ? document.querySelector(parent)?.getBoundingClientRect() || new DOMRect()
    : new DOMRect();

  if (
    e.type == 'touchstart' ||
    e.type == 'touchmove' ||
    e.type == 'touchend' ||
    e.type == 'touchcancel'
  ) {
    const touch =
      (e as React.TouchEvent).touches[0] ||
      (e as React.TouchEvent).changedTouches[0];
    x = touch.pageX - offset.left;
    y = touch.pageY - offset.top;
  } else if (
    e.type == 'mousedown' ||
    e.type == 'mouseup' ||
    e.type == 'mousemove' ||
    e.type == 'mouseover' ||
    e.type == 'mouseout' ||
    e.type == 'mouseenter' ||
    e.type == 'mouseleave'
  ) {
    x = (e as React.MouseEvent).clientX - offset.left;
    y = (e as React.MouseEvent).clientY - offset.top;
  } else {
    // eslint-disable-next-line no-console
    console.error(
      'unable to capture x/y coordinates from click/touch event',
      e
    );
  }

  return { x, y };
};
