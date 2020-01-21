import React, {
  forwardRef,
  useCallback,
  useRef,
  useState,
  useEffect
} from 'react'
import './style.css'

const getListContainerTransformCss = (translateX = 0) =>
  `translateX(-${translateX}px)`

const getListContainerTransitionCss = (transitionSpeed = 300) =>
  `transform ${transitionSpeed}ms ease 100ms`

const ListContainer = forwardRef(
  ({ children, transitionSpeed, translateX, handleTransitionEnd }, ref) => (
    <div
      ref={ref}
      className="showreel-list-container"
      onTransitionEnd={handleTransitionEnd}
      style={{
        transition: getListContainerTransitionCss(transitionSpeed),
        transform: getListContainerTransformCss(translateX)
      }}
    >
      {children}
    </div>
  )
)

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
  const getIsLastItemNotVisible = useCallback(() => {
    console.log('getIsLastItemNotVisible 0')
    if (!listContainer.current) {
      return false
    }

    const childrenCount = listContainer.current.children.length
    const lastChild = listContainer.current.children[childrenCount - 1]
    const {
      width: containerWidth
    } = listContainer.current.getBoundingClientRect()
    const { left, width } = lastChild.getBoundingClientRect()

    console.log(
      'getIsLastItemNotVisible',
      lastChild,
      containerWidth,
      left,
      width
    )
    return left + width === 0 || containerWidth < left + width
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
    setDisplayNextButton(getIsLastItemNotVisible())
  }, [])
  console.log('here')

  useEffect(() => {
    setTransitionSpeed(speed)
  }, [speed])

  return (
    <div className="showreel-container">
      <div className="showreel-control">
        {currentIndex !== 0 ? (
          <button
            className="showreel-nav-button"
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
          </button>
        ) : (
          <div />
        )}
        {displayNextButton ? (
          <button
            className="showreel-nav-button"
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
          </button>
        ) : (
          <div />
        )}
      </div>
      <ListContainer
        ref={listContainer}
        translateX={translateX}
        transitionSpeed={transitionSpeed}
        handleTransitionEnd={() => {
          setDisplayNextButton(getIsLastItemNotVisible())
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
    </div>
  )
}

export default Showreel
