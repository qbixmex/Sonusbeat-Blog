type Props = Readonly<{ children: React.ReactNode }>;

export const MainContainer: React.FC<Props> = (props) => {
  return (
    <div className="container mx-auto px-5 lg:px-0 py-10">
      {props.children}
    </div>
  );
};

export default MainContainer;