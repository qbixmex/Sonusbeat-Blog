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
  "mx-auto px-5 pb-10",
  "md:max-w-[95%] md:px-0",
  "lg:max-w-[90%]",
  "xl:max-w-[85%]",
  "2xl:max-w-[80%]",
];

export default MainContainer;