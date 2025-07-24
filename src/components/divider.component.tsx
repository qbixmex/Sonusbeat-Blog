import { FC } from 'react';
import { cn } from '../lib/utils';

type Props = Readonly<{
  width?: number;
  height?: number;
  spaceY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  spaceX?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}>;

export const Divider: FC<Props> = ({
  height,
  width,
  spaceY = 'md',
  spaceX = 'md',
  orientation = 'horizontal',
  className = "",
  style = {},
}) => {
  return (
    <>
      {(orientation === 'horizontal') && (
        <div
          className={cn([
            "bg-stone-400",
            "dark:bg-stone-700",
            className,
          ], {
            "my-0": spaceY === 'none',
            "my-4": spaceY === 'xs',
            "my-6": spaceY === 'sm',
            "my-8": spaceY === 'md',
            "my-10": spaceY === 'lg',
            "my-12": spaceY === 'xl',
            "my-14": spaceY === '2xl',
          })}
          style={{
            height: height ?? 1,
            ...style
          }}
        ></div>
      )}

      {(orientation === 'vertical') && (
        <div
          className={cn([
            "bg-stone-400",
            "dark:bg-stone-700",
            className,
          ], {
            "mx-0": spaceX === 'none',
            "mx-4": spaceX === 'xs',
            "mx-6": spaceX === 'sm',
            "mx-8": spaceX === 'md',
            "mx-10": spaceX === 'lg',
            "mx-12": spaceX === 'xl',
            "mx-14": spaceX === '2xl',
          })}
          style={{
            width: width ?? 1,
            height: '100%',
            ...style
          }}
        ></div>
      )}
    </>
  );
};

export default Divider;
