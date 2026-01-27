import { cn } from "@/lib/utils";

function Loading({ color = "bg-white" }: { color?: string }) {
  return (
    <div className={cn("min-h-screen flex items-center justify-center", color)}>
      <div className=" bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00] mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  );
}
export default Loading;
