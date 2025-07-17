import { FC } from 'react';
import { cn } from '../lib/utils';

type Props = Readonly<{
  height?: number;
  spaceY?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
}>;

export const Divider: FC<Props> = ({
  height,
  spaceY = 'md',
  className = "",
  style = {},
}) => {
  return (
    <div
      className={cn([
        "bg-stone-400",
        "dark:bg-stone-700",
        "my-10",
        className,
      ], {
        "my-5": spaceY === 'sm',
        "my-10": spaceY === 'md',
        "my-15": spaceY === 'lg',
        "my-20": spaceY === 'xl',
      })}
      style={{
        height: height ?? 1,
        ...style
      }}
    ></div>
  );

};

export default Divider;
