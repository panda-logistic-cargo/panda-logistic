
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ResponsiveContainer from "./ResponsiveContainer";
import { Card, CardContent } from "@/components/ui/card";

const BlogArticleSkeleton = () => {
  return (
    <ResponsiveContainer>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="space-y-8">
          {/* Title and metadata */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-[85%]" />
            <Skeleton className="h-8 w-[65%]" />
            
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
          
          {/* Featured image */}
          <Skeleton className="w-full h-64 rounded-lg" />
          
          {/* Excerpt */}
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[90%]" />
          
          {/* Content */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-[95%]" />
            <Skeleton className="h-5 w-[90%]" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-[85%]" />
            <Skeleton className="h-5 w-[92%]" />
          </div>
          
          {/* Tags section */}
          <div className="pt-4 border-t border-gray-200">
            <Skeleton className="h-6 w-24 mb-3" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>
          
          {/* Share section */}
          <div className="pt-4 border-t border-gray-200">
            <Skeleton className="h-6 w-32 mb-3" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default BlogArticleSkeleton;
