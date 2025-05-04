
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="border border-cargo-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Skeleton className="w-full h-48" />
      <div className="p-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="h-6 w-[85%] mb-2" />
        <Skeleton className="h-6 w-[65%] mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[90%] mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
