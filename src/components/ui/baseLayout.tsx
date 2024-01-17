import { type FC } from "react";

type Props = {
  children: React.ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className=" p-8">
      <div className="mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
        {children}
      </div>
    </div>
  );
};

export { BaseLayout };
