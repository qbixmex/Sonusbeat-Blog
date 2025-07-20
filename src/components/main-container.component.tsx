import { cn } from "../lib/utils";

type Props = Readonly<{ children: React.ReactNode }>;

export const MainContainer: React.FC<Props> = (props) => {
  return (
    <div className={cn(cssClasses, "2xl:")}>
      {props.children}
    </div>
  );
};

const cssClasses = [
  "w-full",
  "mx-auto px-8 pb-10",
  "md:max-w-3xl",
  "lg:max-w-4xl",
  "xl:max-w-5xl",
  "2xl:max-w-[1366px]",
];

export default MainContainer;