import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    email: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    plan: v.union(v.literal("free"), v.literal("pro")),
    // Usage tracking for plan limits
    projectUsed: v.number(),
    exportThisMonth: v.number(),
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .searchIndex("search_name", { searchField: "name" })
    .searchIndex("search_email", { searchField: "email" }),

  projectUse: defineTable({
    title: v.string(),
    userId: v.id("users"),
  
    // canvas dimensions and state
    canvasState: v.any(),
    width: v.number(),
    height: v.number(),

    // image pipeline
    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),

    // Image kit transformation state
    activeTransformations: v.optional(v.string()),

    // AI features state-tracks what AI processing has been applied
    backgroundRemoved: v.optional(v.boolean()),

    // Organization 
    folderid: v.optional(v.id("folders")),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_folder", ["folderid"])
    .index("by_user_Updated", ["userId", "updatedAt"]),

  folders: defineTable({
    name: v.string(),
    userId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"])
});

    /* 
    Plan Limit Example:
    - For a "free" plan, you might limit the number of projects a user can create.
    - For a "pro" plan, you might allow unlimited projects. 
    - Free:3 project, 20 exports per month
    - Pro: Unlimited projects/exports per month, All ai feautures
    */