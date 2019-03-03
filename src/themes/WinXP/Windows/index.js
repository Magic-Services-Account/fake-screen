import React, { useRef } from 'react';
import { useWindowSize } from 'react-use';
import useElementResize from 'src/hooks/useElementResize';
import styled from 'styled-components';

function Windows({ apps, onMouseDown, onCloseWindow }) {
  return apps.map(app => (
    <Window
      key={app.id}
      onMouseDown={onMouseDown.bind(null, app.id)}
      onCloseWindow={onCloseWindow.bind(null, app.id)}
      {...app}
    >
      <app.component onClose={onCloseWindow.bind(null, app.id)} />
    </Window>
  ));
}

function Window({
  children,
  onCloseWindow,
  onMouseDown,
  title,
  defaultSize,
  defaultOffset,
  resizable,
  headerIcon,
  minimized,
}) {
  const dragRef = useRef(null);
  const ref = useRef(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { offset, size } = useElementResize(ref, {
    dragRef,
    defaultOffset,
    defaultSize,
    boundary: {
      top: 1,
      right: windowWidth - 1,
      bottom: windowHeight - 31,
      left: 1,
    },
    resizable,
    resizeThreshold: 10,
  });
  const { width, height } = size;
  const { x, y } = offset;
  return (
    <StyledWindow
      ref={ref}
      onMouseDown={onMouseDown}
      show={!minimized}
      style={{
        transform: `translate(${x}px,${y}px)`,
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
      }}
    >
      <div className="header__bg" />
      <header className="app__header" ref={dragRef}>
        <img src={headerIcon} alt={title} className="app__header__icon" />
        <button className="app__header__close" onMouseUp={onCloseWindow} />
        <span className="app__header__title">{title}</span>
      </header>
      <div className="app__content">{children}</div>
    </StyledWindow>
  );
}

const StyledWindow = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: absolute;
  padding: 3px;
  background-color: #0831d9;
  flex-direction: column;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .header__bg {
    background: linear-gradient(
      to bottom,
      #0058ee 0%,
      #3593ff 4%,
      #288eff 6%,
      #127dff 8%,
      #036ffc 10%,
      #0262ee 14%,
      #0057e5 20%,
      #0054e3 24%,
      #0055eb 56%,
      #005bf5 66%,
      #026afe 76%,
      #026afe 86%,
      #0061fc 92%,
      #005cf7 94%,
      #0044d1 100%
    );
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 28px;
    pointer-events: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .app__header {
    height: 25px;
    line-height: 25px;
    font-weight: 700;
    font-size: 12px;
    text-shadow: 1px 1px #000;
    color: white;
    position: relative;
    display: flex;
    align-items: center;
  }
  .app__header__icon {
    pointer-events: none;
    width: 15px;
    height: 15px;
    margin-left: 1px;
    margin-right: 3px;
  }
  .app__header__title {
    pointer-events: none;
  }
  .app__header__close {
    position: absolute;
    right: 1px;
    top: 1px;
    width: 21px;
    height: 21px;
    border: 1px solid #fff;
    border-radius: 3px;
    background-color: #ff4701;
    &:hover {
      filter: brightness(150%);
    }
    &:before {
      content: '';
      position: absolute;
      left: 9px;
      top: 2px;
      transform: rotate(45deg);
      height: 16px;
      width: 2px;
      background-color: white;
    }
    &:after {
      content: '';
      position: absolute;
      left: 9px;
      top: 2px;
      transform: rotate(-45deg);
      height: 16px;
      width: 2px;
      background-color: white;
    }
  }
  .app__content {
    flex: 1;
    position: relative;
    height: calc(100% - 27px);
  }
`;

export default Windows;