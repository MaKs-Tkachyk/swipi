import { v4 as uuid } from 'uuid';
import {
  AddUniqueIdReturnType,
  ReturnSlideWidthType,
  ConfigType,
} from './types';
import { defaultSliderWidth } from './constants';

export const getSliderWidth = (current: HTMLDivElement | null): number =>
  current?.getBoundingClientRect().width ?? defaultSliderWidth;

export const addUniqueId = (slides: JSX.Element[]): AddUniqueIdReturnType =>
  slides.map((slide) => ({ ...slide, id: uuid() }));

export const getSliderUpdatesParam = <T extends keyof ConfigType>(
  config: ConfigType[],
  windowWidth: number,
  param: T
): ConfigType[T] | undefined =>
  config.filter((item) => item.maxWidth >= windowWidth).at(-1)?.[param];

export const isCornerSlide = (
  config: ConfigType[],
  windowWidth: number
): boolean => !!getSliderUpdatesParam(config, windowWidth, 'biasRight');

export const returnCountSlides = (
  config: ConfigType[],
  windowWidth: number
): number => getSliderUpdatesParam(config, windowWidth, 'slidesNumber') || 3;

export const returnSpaceBetween = (
  config: ConfigType[],
  windowWidth: number
): number => getSliderUpdatesParam(config, windowWidth, 'spaceBetween') || 0;

export const returnSlideWidth = ({
  visibleCountSlides,
  current,
  spaceBetween,
}: ReturnSlideWidthType): number =>
  (getSliderWidth(current) + spaceBetween) / visibleCountSlides;

export const calculateSlideIndex = (
  transform: number,
  slideWidth: number,
  children: JSX.Element[]
): number => {
  const result = Math.round(Math.abs(transform / slideWidth));

  return Math.abs(result % children.length);
};
