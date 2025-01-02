import { cn } from "@/lib/utils";
import { Spinner } from "@nextui-org/react";

const LoadingSurface = ({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "size-full flex-1 flex items-center justify-center",
        className
      )}
    >
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingSurface;
