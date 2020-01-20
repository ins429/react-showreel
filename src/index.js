import React, { useCallback, useRef, useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const translateXCss = ({ translateX = 0 }) => css`
  transform: translateX(-${translateX}px);
`

const transitionSpeedCss = ({ transitionSpeed = 300 }) => `${transitionSpeed}ms`

const ListContainer = styled.div`
  display: flex;
  flex-basis: 100%
  width: 100%;
  height: 250px;

  ${translateXCss};
  transition: transform ${transitionSpeedCss};

  & > * {
    flex: 0 0 auto;
  }
`

const ControlBox = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NavButton = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin: 1.25rem;
  z-index: 2;
  box-shadow: 0;
  border: 0;

  svg {
    pointer-events: none;
  }
`

const Showreel = ({
  children,
  slidesToScroll = 1,
  slidePage = false,
  infinite = false,
  speed = 300
}) => {
  const listContainer = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitionSpeed, setTransitionSpeed] = useState(speed)
  const [translateX, setTranslateX] = useState(0)
  const [displayNextButton, setDisplayNextButton] = useState(false)
  const [lockButtons, setLockButtons] = useState(false)
  const getIsLastItemVisible = useCallback(() => {
    if (!listContainer.current) {
      return false
    }

    const childrenCount = listContainer.current.children.length
    const lastChild = listContainer.current.children[childrenCount - 1]
    const {
      width: containerWidth
    } = listContainer.current.getBoundingClientRect()
    const { left, width } = lastChild.getBoundingClientRect()

    return containerWidth < left + width
  }, [listContainer])

  useEffect(() => {
    if (listContainer.current && listContainer.current.children[currentIndex]) {
      const selectedChild = listContainer.current.children[currentIndex]

      if (selectedChild.offsetLeft !== translateX) {
        setLockButtons(true)
        setTranslateX(selectedChild.offsetLeft)
      }
    }
  }, [listContainer, currentIndex])

  useEffect(() => {
    if (listContainer.current && infinite) {
      setCurrentIndex(listContainer.current.children.length / 3)
    }
  }, [listContainer])

  useEffect(() => {
    setDisplayNextButton(getIsLastItemVisible())
  }, [])

  return (
    <Container>
      <ControlBox>
        {currentIndex !== 0 ? (
          <NavButton
            disabled={lockButtons}
            onClick={() => {
              if (slidePage) {
                const childrenCount = listContainer.current.children.length
                const {
                  width: containerWidth
                } = listContainer.current.getBoundingClientRect()

                let index = currentIndex - 1
                let width = 0

                while (index > 0 && width < containerWidth) {
                  const prevChild = listContainer.current.children[index]
                  const {
                    width: prevChildWidth
                  } = prevChild.getBoundingClientRect()

                  width = width + prevChildWidth
                  if (width > containerWidth) {
                    break
                  }
                  index = index - 1
                }

                setCurrentIndex(index)
                return
              }

              const indexToScroll = currentIndex - slidesToScroll

              setCurrentIndex(indexToScroll < 0 ? 0 : indexToScroll)
            }}
          >
            &#x2190;
          </NavButton>
        ) : (
          <div />
        )}
        {displayNextButton ? (
          <NavButton
            disabled={lockButtons}
            onClick={() => {
              if (slidePage) {
                const childrenCount = listContainer.current.children.length
                const {
                  width: containerWidth
                } = listContainer.current.getBoundingClientRect()

                let index = currentIndex
                let width = 0

                while (width < containerWidth) {
                  const nextChild = listContainer.current.children[index]
                  const {
                    width: nextChildWidth
                  } = nextChild.getBoundingClientRect()

                  width = width + nextChildWidth
                  if (width > containerWidth) {
                    break
                  }
                  index = index + 1
                }

                setCurrentIndex(index)
                return
              }

              const indexToScroll = currentIndex + slidesToScroll

              setCurrentIndex(
                indexToScroll > listContainer.current.children.length - 1
                  ? currentIndex + 1
                  : indexToScroll
              )
            }}
          >
            &#x2192;
          </NavButton>
        ) : (
          <div />
        )}
      </ControlBox>
      <ListContainer
        ref={listContainer}
        translateX={translateX}
        transitionSpeed={transitionSpeed}
        onTransitionEnd={() => {
          setDisplayNextButton(getIsLastItemVisible())
          setLockButtons(false)

          if (transitionSpeed < 1) {
            setTransitionSpeed(speed)
            return
          }

          if (infinite) {
            const childCount = listContainer.current.children.length / 3

            if (currentIndex < childCount) {
              setTransitionSpeed(0.5)
              setCurrentIndex(currentIndex + childCount)
            }
            if (currentIndex > childCount * 2) {
              setTransitionSpeed(0.5)
              setCurrentIndex(currentIndex - childCount)
            }
          }
        }}
      >
        {infinite ? [...children, ...children, ...children] : children}
      </ListContainer>
    </Container>
  )
}

export default Showreel
