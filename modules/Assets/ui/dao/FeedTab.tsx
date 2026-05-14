"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";

export default function FeedTab() {
  const posts = [
    {
      id: 1,
      title: "Q1 2024 Performance Report Published",
      date: "2024-03-15 14:30",
      views: 156,
      content:
        "We're excited to share our Q1 performance report. The portfolio has shown strong growth with a 12% increase in property values and improved tenant occupancy rates.",
      tags: ["announcement", "performance"],
    },
    {
      id: 2,
      title: "Community Meeting - April 10th",
      date: "2024-03-14 10:15",
      views: 89,
      content:
        "Join us for our monthly community meeting to discuss upcoming property maintenance schedules, budget allocations, and Q2 planning. Your input is valuable!",
      tags: ["meeting", "community"],
    },
    {
      id: 3,
      title: "New Treasury Guidelines Effective Immediately",
      date: "2024-03-13 09:45",
      views: 203,
      content:
        "Updated guidelines for treasury operations and spending approvals are now in effect. All members should review the new protocols in the governance section.",
      tags: ["treasury", "guidelines"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Community Feed
          </h1>
          <p className="text-gray-500 mt-1 text-base">
            Stay updated with announcements and discussions
          </p>
        </div>

        <Button className="h-11 px-5 rounded-xl bg-yob-primary text-white hover:bg-yob-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Feed Cards */}
      <div className="space-y-5">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="rounded-2xl border shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-7">
              <h2 className="text-xl font-semibold text-gray-900">
                {post.title}
              </h2>

              <div className="flex items-center gap-5 text-sm text-gray-500 mt-3">
                <span>{post.date}</span>

                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{post.views} views</span>
                </div>
              </div>

              <p className="mt-6 text-gray-700 text-base leading-7">
                {post.content}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
