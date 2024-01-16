import { type FC } from "react";

type Props = {
  children: React.ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        {children}
      </div>
    </div>
  );
};

export { BaseLayout };
