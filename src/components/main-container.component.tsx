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
  "mx-auto px-5",
  "md:max-w-[700px]",
  "lg:max-w-[960px]",
  "lg:px-8",
  "lg:pb-10",
  "xl:max-w-[1200px]",
  "2xl:max-w-[1360px]",
];

export default MainContainer;