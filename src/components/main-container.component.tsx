import { cn } from "../lib/utils";

type Props = Readonly<{ children: React.ReactNode }>;

export const MainContainer: React.FC<Props> = (props) => {
  return (
    <div className={cn(cssClasses)}>
      {props.children}
    </div>
  );
};

const cssClasses = [
  "w-full",
  "mx-auto px-8",
];

export default MainContainer;