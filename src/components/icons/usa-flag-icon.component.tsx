import { FC } from "react";

type Props = Readonly<{
  className?: string;
  style?: React.CSSProperties;
}>;

export const USAFlagIcon: FC<Props> = ({ className, style }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      className={className}
      style={style}
      viewBox="0 0 640 480"
    >
      <path fill="#bd3d44" d="M0 0h640v480H0"></path>
      <path stroke="#fff" strokeWidth={37} d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"></path>
      <path fill="#192f5d" d="M0 0h364.8v258.5H0"></path>
      <marker id="flagUm4x30" markerHeight={30} markerWidth={30}>
        <path fill="#fff" d="m14 0l9 27L0 10h28L5 27z"></path>
      </marker>
      <path fill="none" markerMid="url(#flagUm4x30)" d="m0 0l16 11h61h61h61h61h60L47 37h61h61h60h61L16 63h61h61h61h61h60L47 89h61h61h60h61L16 115h61h61h61h61h60L47 141h61h61h60h61L16 166h61h61h61h61h60L47 192h61h61h60h61L16 218h61h61h61h61h60z"></path>
    </svg>
  );
};

export default USAFlagIcon;