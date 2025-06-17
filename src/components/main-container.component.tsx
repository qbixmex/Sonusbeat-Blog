type Props = Readonly<{ children: React.ReactNode }>;

export const MainContainer: React.FC<Props> = (props) => {
  return (
    <div className="mx-auto p-5 lg:px-8 lg:py-10">
      {props.children}
    </div>
  );
};

export default MainContainer;