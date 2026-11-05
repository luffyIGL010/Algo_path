export type ProblemType = "dsa" | "sql" | "system_design";
export type Difficulty = "Easy" | "Medium" | "Hard";

export type Problem = {
  slug: string;
  title: string;
  type: ProblemType;
  difficulty: Difficulty;
  companies: string[];
  acceptance: string;
};

export const problems: Problem[] = [
  { slug: "two-sum", title: "Two Sum", type: "dsa", difficulty: "Easy", companies: ["Google", "TCS", "Amazon"], acceptance: "49.2%" },
  { slug: "valid-parentheses", title: "Valid Parentheses", type: "dsa", difficulty: "Easy", companies: ["Amazon", "Microsoft"], acceptance: "40.8%" },
  { slug: "merge-intervals", title: "Merge Intervals", type: "dsa", difficulty: "Medium", companies: ["Google", "Bloomberg"], acceptance: "47.6%" },
  { slug: "best-time-to-buy-and-sell-stock", title: "Best Time to Buy and Sell Stock", type: "dsa", difficulty: "Easy", companies: ["Amazon", "Adobe"], acceptance: "54.3%" },
  { slug: "longest-substring-without-repeating-characters", title: "Longest Substring Without Repeating Characters", type: "dsa", difficulty: "Medium", companies: ["Amazon", "Google"], acceptance: "35.1%" },
  { slug: "product-of-array-except-self", title: "Product of Array Except Self", type: "dsa", difficulty: "Medium", companies: ["Meta", "Microsoft"], acceptance: "66.7%" },
  { slug: "maximum-subarray", title: "Maximum Subarray", type: "dsa", difficulty: "Medium", companies: ["LinkedIn", "Amazon"], acceptance: "50.4%" },
  { slug: "reverse-linked-list", title: "Reverse Linked List", type: "dsa", difficulty: "Easy", companies: ["Google", "TCS"], acceptance: "77.9%" },
  { slug: "linked-list-cycle", title: "Linked List Cycle", type: "dsa", difficulty: "Easy", companies: ["Amazon", "Microsoft"], acceptance: "48.1%" },
  { slug: "binary-tree-level-order-traversal", title: "Binary Tree Level Order Traversal", type: "dsa", difficulty: "Medium", companies: ["Amazon", "Google"], acceptance: "66.2%" },
  { slug: "validate-binary-search-tree", title: "Validate Binary Search Tree", type: "dsa", difficulty: "Medium", companies: ["Bloomberg", "Meta"], acceptance: "34.8%" },
  { slug: "number-of-islands", title: "Number of Islands", type: "dsa", difficulty: "Medium", companies: ["Amazon", "Google"], acceptance: "61.5%" },
  { slug: "course-schedule", title: "Course Schedule", type: "dsa", difficulty: "Medium", companies: ["Uber", "Microsoft"], acceptance: "48.7%" },
  { slug: "climbing-stairs", title: "Climbing Stairs", type: "dsa", difficulty: "Easy", companies: ["Amazon", "Adobe"], acceptance: "53.2%" },
  { slug: "coin-change", title: "Coin Change", type: "dsa", difficulty: "Medium", companies: ["Google", "Amazon"], acceptance: "43.6%" },
  { slug: "lru-cache", title: "LRU Cache", type: "dsa", difficulty: "Medium", companies: ["Amazon", "Google", "Microsoft"], acceptance: "43.8%" },
  { slug: "median-of-two-sorted-arrays", title: "Median of Two Sorted Arrays", type: "dsa", difficulty: "Hard", companies: ["Google", "Apple"], acceptance: "42.1%" },
  { slug: "trapping-rain-water", title: "Trapping Rain Water", type: "dsa", difficulty: "Hard", companies: ["Amazon", "Goldman Sachs"], acceptance: "63.4%" },
  { slug: "word-search", title: "Word Search", type: "dsa", difficulty: "Medium", companies: ["Microsoft", "Bloomberg"], acceptance: "43.2%" },
  { slug: "find-median-from-data-stream", title: "Find Median from Data Stream", type: "dsa", difficulty: "Hard", companies: ["Google", "Amazon"], acceptance: "52.3%" },
  { slug: "second-highest-salary", title: "Second Highest Salary", type: "sql", difficulty: "Medium", companies: ["Amazon", "Adobe"], acceptance: "40.6%" },
  { slug: "duplicate-emails", title: "Duplicate Emails", type: "sql", difficulty: "Easy", companies: ["Amazon", "TCS"], acceptance: "72.1%" },
  { slug: "employees-earning-more-than-managers", title: "Employees Earning More Than Their Managers", type: "sql", difficulty: "Easy", companies: ["Amazon", "Google"], acceptance: "68.4%" },
  { slug: "customers-who-never-order", title: "Customers Who Never Order", type: "sql", difficulty: "Easy", companies: ["Uber", "Microsoft"], acceptance: "65.7%" },
  { slug: "top-three-salaries-per-department", title: "Top Three Salaries per Department", type: "sql", difficulty: "Hard", companies: ["Google", "Amazon"], acceptance: "48.9%" },
  { slug: "department-highest-salary", title: "Department Highest Salary", type: "sql", difficulty: "Medium", companies: ["Facebook", "Amazon"], acceptance: "59.2%" },
  { slug: "consecutive-numbers", title: "Consecutive Numbers", type: "sql", difficulty: "Medium", companies: ["Amazon", "Microsoft"], acceptance: "50.2%" },
  { slug: "rank-scores", title: "Rank Scores", type: "sql", difficulty: "Medium", companies: ["Google", "TCS"], acceptance: "67.8%" },
  { slug: "rising-temperature", title: "Rising Temperature", type: "sql", difficulty: "Easy", companies: ["Amazon", "Bloomberg"], acceptance: "49.7%" },
  { slug: "customers-who-bought-all-products", title: "Customers Who Bought All Products", type: "sql", difficulty: "Medium", companies: ["Google", "Adobe"], acceptance: "65.1%" },
  { slug: "running-total", title: "Running Total of Sales", type: "sql", difficulty: "Medium", companies: ["Walmart", "Amazon"], acceptance: "—" },
  { slug: "month-over-month-growth", title: "Month-over-Month Growth", type: "sql", difficulty: "Medium", companies: ["Uber", "Google"], acceptance: "—" },
  { slug: "consecutive-login-days", title: "Consecutive Login Days", type: "sql", difficulty: "Hard", companies: ["Meta", "LinkedIn"], acceptance: "—" },
  { slug: "product-sales-analysis", title: "Product Sales Analysis", type: "sql", difficulty: "Easy", companies: ["Amazon", "Adobe"], acceptance: "70.5%" },
  { slug: "monthly-transactions", title: "Monthly Transactions", type: "sql", difficulty: "Medium", companies: ["Google", "TCS"], acceptance: "62.8%" },
  { slug: "immediate-food-delivery", title: "Immediate Food Delivery", type: "sql", difficulty: "Medium", companies: ["Uber", "DoorDash"], acceptance: "51.3%" },
  { slug: "median-employee-salary", title: "Median Employee Salary", type: "sql", difficulty: "Hard", companies: ["Google", "Amazon"], acceptance: "—" },
  { slug: "design-url-shortener", title: "Design a URL Shortener", type: "system_design", difficulty: "Medium", companies: ["Google", "Amazon", "TCS"], acceptance: "Rubric" },
  { slug: "design-rate-limiter", title: "Design a Rate Limiter", type: "system_design", difficulty: "Medium", companies: ["Stripe", "Cloudflare"], acceptance: "Rubric" },
  { slug: "design-chat-app", title: "Design a Chat Application", type: "system_design", difficulty: "Hard", companies: ["Meta", "Microsoft"], acceptance: "Rubric" },
  { slug: "design-news-feed", title: "Design a News Feed", type: "system_design", difficulty: "Hard", companies: ["Meta", "LinkedIn"], acceptance: "Rubric" },
  { slug: "design-notification-system", title: "Design a Notification System", type: "system_design", difficulty: "Medium", companies: ["Amazon", "Uber"], acceptance: "Rubric" },
  { slug: "design-ride-booking", title: "Design a Ride Booking Service", type: "system_design", difficulty: "Hard", companies: ["Uber", "Lyft"], acceptance: "Rubric" },
  { slug: "design-video-streaming", title: "Design a Video Streaming Platform", type: "system_design", difficulty: "Hard", companies: ["Netflix", "YouTube"], acceptance: "Rubric" },
  { slug: "design-ticket-booking", title: "Design a Ticket Booking System", type: "system_design", difficulty: "Hard", companies: ["BookMyShow", "Amazon"], acceptance: "Rubric" },
];

export const problemTypeLabels: Record<ProblemType | "all", string> = {
  all: "All problems",
  dsa: "DSA",
  sql: "SQL",
  system_design: "System design",
};
