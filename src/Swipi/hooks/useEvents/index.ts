import { useState } from 'react'
import { TouchEvents } from './types'
import { calculateSlideIndex, getSwipeDirection } from '../../helpers'
import { SwipeDirections } from '../../constants'

export const useEvents = ({
  children,
  transform,
  slideWidth,
  isShowArrows,
  startTransform,
  setEndX,
  setStartX,
  moveSlides,
  setMovePath,
  setAnimation,
  setTransform,
  setSlideIndex,
  checkSwipiCorner,
  jumpToTheLastSlide,
  checkAreaBeyondSwipi,
  startX,
  isDisableMove
}: TouchEvents) => {
  const [mouseDown, setMouseDown] = useState(false)

  const resetCoordinates = (): void => {
    setEndX(0)
    setMovePath(0)
    setStartX(0)
  }

  const turnInitialPosition = (): void => {
    setAnimation(false)
    setTransform((prev) => (prev ? prev - startTransform : startTransform))
  }

  const onSwipe = (): void => {
    setTransform((prev) => Math.round(prev / slideWidth) * slideWidth)
  }

  const onStart = (X: number): void => {
    checkSwipiCorner() && turnInitialPosition()
    setStartX(X)
    setMouseDown(true)
  }

  const onMove = (X: number): void => {
    if (!mouseDown) return

    const swipedSide = getSwipeDirection({ touchEndX: X, touchStartX: startX })

    if (isDisableMove(swipedSide === SwipeDirections.LEFT)) return

    setAnimation(false)
    moveSlides()
    setEndX(X)
    setSlideIndex(calculateSlideIndex(transform, slideWidth, children))
  }

  const onEnd = (): void => {
    setAnimation(true)
    onSwipe()
    checkAreaBeyondSwipi() && jumpToTheLastSlide()
    resetCoordinates()
    setMouseDown(false)
  }

  return {
    onStart: isShowArrows ? onStart : () => {},
    onMove: isShowArrows ? onMove : () => {},
    onEnd
  }
}
