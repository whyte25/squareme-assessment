import { Icons } from "@/constants/icons";

export const Notification = () => {
  return (
    <div className="h-[24px]">
      <Icons.notification />
      <span className="relative -top-6 left-3 flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
      </span>
    </div>
  );
};
