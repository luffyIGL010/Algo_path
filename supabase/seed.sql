insert into public.problems (slug, title, type, difficulty, statement)
values
  ('two-sum', 'Two Sum', 'dsa', 'Easy', 'Given an array of integers and a target, return the indices of two numbers that add up to the target. Each input has exactly one solution, and you may not use the same element twice.'),
  ('valid-parentheses', 'Valid Parentheses', 'dsa', 'Easy', 'Given a string containing only brackets, determine whether every opening bracket is closed by the correct type of bracket in the correct order.'),
  ('merge-intervals', 'Merge Intervals', 'dsa', 'Medium', 'Given a list of intervals, merge all overlapping intervals and return the resulting non-overlapping intervals.'),
  ('best-time-to-buy-and-sell-stock', 'Best Time to Buy and Sell Stock', 'dsa', 'Easy', 'Given daily stock prices, choose one day to buy and a later day to sell to maximize profit. Return zero if no profitable trade is possible.'),
  ('longest-substring-without-repeating-characters', 'Longest Substring Without Repeating Characters', 'dsa', 'Medium', 'Given a string, return the length of its longest substring containing no repeated characters.'),
  ('product-of-array-except-self', 'Product of Array Except Self', 'dsa', 'Medium', 'Given an integer array, return an array where each position contains the product of every other value. Do not use division and aim for linear time.'),
  ('maximum-subarray', 'Maximum Subarray', 'dsa', 'Medium', 'Given an integer array, find the contiguous subarray with the largest sum and return that sum.'),
  ('reverse-linked-list', 'Reverse Linked List', 'dsa', 'Easy', 'Given the head of a singly linked list, reverse the list in place and return its new head.'),
  ('linked-list-cycle', 'Linked List Cycle', 'dsa', 'Easy', 'Given the head of a linked list, determine whether following its next pointers eventually revisits a node.'),
  ('binary-tree-level-order-traversal', 'Binary Tree Level Order Traversal', 'dsa', 'Medium', 'Given a binary tree, return its node values grouped by level from left to right.'),
  ('validate-binary-search-tree', 'Validate Binary Search Tree', 'dsa', 'Medium', 'Given the root of a binary tree, determine whether it satisfies the strict binary search tree ordering property.'),
  ('number-of-islands', 'Number of Islands', 'dsa', 'Medium', 'Given a grid of land and water cells, count the number of connected islands. Cells connect horizontally and vertically.'),
  ('course-schedule', 'Course Schedule', 'dsa', 'Medium', 'Given course prerequisites, determine whether it is possible to finish every course.'),
  ('climbing-stairs', 'Climbing Stairs', 'dsa', 'Easy', 'You are climbing a staircase with n steps and can climb one or two steps at a time. Return the number of distinct ways to reach the top.'),
  ('coin-change', 'Coin Change', 'dsa', 'Medium', 'Given coin denominations and an amount, return the fewest coins needed to make that amount, or -1 if it cannot be made.'),
  ('lru-cache', 'LRU Cache', 'dsa', 'Medium', 'Design a least-recently-used cache supporting get and put in average constant time.'),
  ('median-of-two-sorted-arrays', 'Median of Two Sorted Arrays', 'dsa', 'Hard', 'Given two sorted arrays, return the median of their combined values in logarithmic time.'),
  ('trapping-rain-water', 'Trapping Rain Water', 'dsa', 'Hard', 'Given bar heights representing an elevation map, calculate how much rainwater can be trapped after raining.'),
  ('word-search', 'Word Search', 'dsa', 'Medium', 'Given a character grid and a word, determine whether the word can be formed by sequentially adjacent cells without reusing a cell.'),
  ('find-median-from-data-stream', 'Find Median from Data Stream', 'dsa', 'Hard', 'Design a data structure that accepts integers and returns the median of all values seen so far.'),
  ('second-highest-salary', 'Second Highest Salary', 'sql', 'Medium', 'From the Employee table, return the second-highest distinct salary. Return null if a second distinct salary does not exist.'),
  ('duplicate-emails', 'Duplicate Emails', 'sql', 'Easy', 'Find every email address that appears more than once in the Person table.'),
  ('employees-earning-more-than-managers', 'Employees Earning More Than Their Managers', 'sql', 'Easy', 'Find employees whose salary is greater than the salary of their manager. The Employee table references managers by id.'),
  ('customers-who-never-order', 'Customers Who Never Order', 'sql', 'Easy', 'Return the names of customers who have never placed an order.'),
  ('top-three-salaries-per-department', 'Top Three Salaries per Department', 'sql', 'Hard', 'For each department, return employees whose salary ranks in the top three distinct salaries. Include ties.'),
  ('department-highest-salary', 'Department Highest Salary', 'sql', 'Medium', 'Return each department and its employee or employees with the highest salary.'),
  ('consecutive-numbers', 'Consecutive Numbers', 'sql', 'Medium', 'Find values that appear at least three times consecutively in the Logs table.'),
  ('rank-scores', 'Rank Scores', 'sql', 'Medium', 'Rank each score from highest to lowest, assigning equal scores the same rank without gaps.'),
  ('rising-temperature', 'Rising Temperature', 'sql', 'Easy', 'Find dates whose recorded temperature is higher than the previous calendar day.'),
  ('customers-who-bought-all-products', 'Customers Who Bought All Products', 'sql', 'Medium', 'Find customers who purchased every product listed in the Product table.'),
  ('running-total', 'Running Total of Sales', 'sql', 'Medium', 'For each transaction date, report daily sales and the cumulative sales total in date order.'),
  ('month-over-month-growth', 'Month-over-Month Growth', 'sql', 'Medium', 'Calculate monthly revenue and its percentage change from the previous month. The first month has no previous-month change.'),
  ('consecutive-login-days', 'Consecutive Login Days', 'sql', 'Hard', 'Find users with a streak of at least three consecutive calendar-day logins.'),
  ('product-sales-analysis', 'Product Sales Analysis', 'sql', 'Easy', 'Return product names and their sales records, including the year and units sold.'),
  ('monthly-transactions', 'Monthly Transactions', 'sql', 'Medium', 'For each month and country, report transaction count, approved count, total amount, and approved amount.'),
  ('immediate-food-delivery', 'Immediate Food Delivery', 'sql', 'Medium', 'Calculate the percentage of customers whose first food order was delivered on their preferred delivery date.'),
  ('median-employee-salary', 'Median Employee Salary', 'sql', 'Hard', 'Return the middle salary row or rows within each company, handling both odd and even employee counts.'),
  ('design-url-shortener', 'Design a URL Shortener', 'system_design', 'Medium', 'Design a service that creates short links, redirects reliably, and supports analytics at internet scale.'),
  ('design-rate-limiter', 'Design a Rate Limiter', 'system_design', 'Medium', 'Design a distributed rate-limiting service that can enforce per-user and per-API limits with low latency.'),
  ('design-chat-app', 'Design a Chat Application', 'system_design', 'Hard', 'Design a real-time messaging application supporting one-to-one and group conversations across devices.'),
  ('design-news-feed', 'Design a News Feed', 'system_design', 'Hard', 'Design a personalized social news feed that serves fresh posts to a large and unevenly distributed audience.'),
  ('design-notification-system', 'Design a Notification System', 'system_design', 'Medium', 'Design a service that delivers reliable push, email, and SMS notifications with user preferences.'),
  ('design-ride-booking', 'Design a Ride Booking Service', 'system_design', 'Hard', 'Design a ride-hailing platform that matches riders and drivers and tracks active trips in real time.'),
  ('design-video-streaming', 'Design a Video Streaming Platform', 'system_design', 'Hard', 'Design a global video-on-demand platform for uploads, transcoding, discovery, and adaptive playback.'),
  ('design-ticket-booking', 'Design a Ticket Booking System', 'system_design', 'Hard', 'Design an event-ticketing platform that handles high-demand releases without overselling seats.')
on conflict (slug) do update set
  title = excluded.title,
  type = excluded.type,
  difficulty = excluded.difficulty,
  statement = excluded.statement;

create temporary table seed_problem_companies (
  slug text not null,
  company_name text not null
);

insert into seed_problem_companies (slug, company_name) values
  ('two-sum', 'Google'), ('two-sum', 'TCS'), ('two-sum', 'Amazon'),
  ('valid-parentheses', 'Amazon'), ('valid-parentheses', 'Microsoft'),
  ('merge-intervals', 'Google'), ('merge-intervals', 'Bloomberg'),
  ('best-time-to-buy-and-sell-stock', 'Amazon'), ('best-time-to-buy-and-sell-stock', 'Adobe'),
  ('longest-substring-without-repeating-characters', 'Amazon'), ('longest-substring-without-repeating-characters', 'Google'),
  ('product-of-array-except-self', 'Meta'), ('product-of-array-except-self', 'Microsoft'),
  ('maximum-subarray', 'LinkedIn'), ('maximum-subarray', 'Amazon'),
  ('reverse-linked-list', 'Google'), ('reverse-linked-list', 'TCS'),
  ('linked-list-cycle', 'Amazon'), ('linked-list-cycle', 'Microsoft'),
  ('binary-tree-level-order-traversal', 'Amazon'), ('binary-tree-level-order-traversal', 'Google'),
  ('validate-binary-search-tree', 'Bloomberg'), ('validate-binary-search-tree', 'Meta'),
  ('number-of-islands', 'Amazon'), ('number-of-islands', 'Google'),
  ('course-schedule', 'Uber'), ('course-schedule', 'Microsoft'),
  ('climbing-stairs', 'Amazon'), ('climbing-stairs', 'Adobe'),
  ('coin-change', 'Google'), ('coin-change', 'Amazon'),
  ('lru-cache', 'Amazon'), ('lru-cache', 'Google'), ('lru-cache', 'Microsoft'),
  ('median-of-two-sorted-arrays', 'Google'), ('median-of-two-sorted-arrays', 'Apple'),
  ('trapping-rain-water', 'Amazon'), ('trapping-rain-water', 'Goldman Sachs'),
  ('word-search', 'Microsoft'), ('word-search', 'Bloomberg'),
  ('find-median-from-data-stream', 'Google'), ('find-median-from-data-stream', 'Amazon'),
  ('second-highest-salary', 'Amazon'), ('second-highest-salary', 'Adobe'),
  ('duplicate-emails', 'Amazon'), ('duplicate-emails', 'TCS'),
  ('employees-earning-more-than-managers', 'Amazon'), ('employees-earning-more-than-managers', 'Google'),
  ('customers-who-never-order', 'Uber'), ('customers-who-never-order', 'Microsoft'),
  ('top-three-salaries-per-department', 'Google'), ('top-three-salaries-per-department', 'Amazon'),
  ('department-highest-salary', 'Facebook'), ('department-highest-salary', 'Amazon'),
  ('consecutive-numbers', 'Amazon'), ('consecutive-numbers', 'Microsoft'),
  ('rank-scores', 'Google'), ('rank-scores', 'TCS'),
  ('rising-temperature', 'Amazon'), ('rising-temperature', 'Bloomberg'),
  ('customers-who-bought-all-products', 'Google'), ('customers-who-bought-all-products', 'Adobe'),
  ('running-total', 'Walmart'), ('running-total', 'Amazon'),
  ('month-over-month-growth', 'Uber'), ('month-over-month-growth', 'Google'),
  ('consecutive-login-days', 'Meta'), ('consecutive-login-days', 'LinkedIn'),
  ('product-sales-analysis', 'Amazon'), ('product-sales-analysis', 'Adobe'),
  ('monthly-transactions', 'Google'), ('monthly-transactions', 'TCS'),
  ('immediate-food-delivery', 'Uber'), ('immediate-food-delivery', 'DoorDash'),
  ('median-employee-salary', 'Google'), ('median-employee-salary', 'Amazon'),
  ('design-url-shortener', 'Google'), ('design-url-shortener', 'Amazon'), ('design-url-shortener', 'TCS'),
  ('design-rate-limiter', 'Stripe'), ('design-rate-limiter', 'Cloudflare'),
  ('design-chat-app', 'Meta'), ('design-chat-app', 'Microsoft'),
  ('design-news-feed', 'Meta'), ('design-news-feed', 'LinkedIn'),
  ('design-notification-system', 'Amazon'), ('design-notification-system', 'Uber'),
  ('design-ride-booking', 'Uber'), ('design-ride-booking', 'Lyft'),
  ('design-video-streaming', 'Netflix'), ('design-video-streaming', 'YouTube'),
  ('design-ticket-booking', 'BookMyShow'), ('design-ticket-booking', 'Amazon');

insert into public.companies (name)
select distinct company_name from seed_problem_companies
on conflict (name) do nothing;

insert into public.problem_companies (problem_id, company_id)
select p.id, c.id
from seed_problem_companies seed
join public.problems p on p.slug = seed.slug
join public.companies c on c.name = seed.company_name
on conflict do nothing;

insert into public.design_rubrics (problem_id, items, pass_threshold)
select p.id, rubric.items, 6
from (values
  ('design-url-shortener', '[{"id":"requirements","label":"Clarifies functional and non-functional requirements"},{"id":"api","label":"Defines create, redirect, and analytics APIs"},{"id":"id-generation","label":"Explains collision-resistant short-code generation"},{"id":"storage","label":"Chooses a suitable key-value storage model"},{"id":"redirects","label":"Optimizes redirect latency and availability"},{"id":"scale","label":"Addresses caching, partitioning, and scale"},{"id":"reliability","label":"Covers failure handling and durability"},{"id":"tradeoffs","label":"Discusses alternatives and trade-offs"}]'::jsonb),
  ('design-rate-limiter', '[{"id":"requirements","label":"Clarifies limit scope, keys, and consistency needs"},{"id":"algorithms","label":"Compares token bucket, leaky bucket, or sliding windows"},{"id":"api","label":"Defines a low-latency client-facing API"},{"id":"distributed-state","label":"Explains shared counter or state storage"},{"id":"scale","label":"Addresses sharding, hot keys, and throughput"},{"id":"failure","label":"Defines behavior during dependency failures"},{"id":"observability","label":"Includes metrics and operational visibility"},{"id":"tradeoffs","label":"Discusses accuracy, latency, and cost trade-offs"}]'::jsonb),
  ('design-chat-app', '[{"id":"requirements","label":"Clarifies delivery guarantees and conversation features"},{"id":"api","label":"Defines messaging and conversation APIs"},{"id":"connections","label":"Explains persistent connection management"},{"id":"delivery","label":"Covers ordering, acknowledgements, and offline delivery"},{"id":"storage","label":"Models messages and conversation history"},{"id":"scale","label":"Addresses fan-out, partitioning, and presence"},{"id":"reliability","label":"Covers retries, deduplication, and recovery"},{"id":"security","label":"Discusses authentication and message privacy"}]'::jsonb),
  ('design-news-feed', '[{"id":"requirements","label":"Clarifies freshness, ranking, and feed behavior"},{"id":"api","label":"Defines feed and post APIs"},{"id":"fanout","label":"Compares fan-out-on-write and fan-out-on-read"},{"id":"ranking","label":"Describes ranking and personalization"},{"id":"storage","label":"Models posts, follows, and feed entries"},{"id":"scale","label":"Addresses celebrity users, caching, and partitioning"},{"id":"freshness","label":"Balances feed freshness with latency"},{"id":"reliability","label":"Covers backfill, retries, and degraded operation"}]'::jsonb),
  ('design-notification-system', '[{"id":"requirements","label":"Clarifies delivery channels, priority, and guarantees"},{"id":"api","label":"Defines notification submission and preference APIs"},{"id":"queueing","label":"Uses queues and workers for asynchronous delivery"},{"id":"preferences","label":"Models subscriptions, templates, and opt-outs"},{"id":"retries","label":"Covers retry, deduplication, and dead-letter handling"},{"id":"scale","label":"Addresses provider quotas and traffic spikes"},{"id":"observability","label":"Tracks delivery status and operational metrics"},{"id":"tradeoffs","label":"Discusses latency, ordering, and cost trade-offs"}]'::jsonb),
  ('design-ride-booking', '[{"id":"requirements","label":"Clarifies rider, driver, and trip requirements"},{"id":"api","label":"Defines trip request and state transition APIs"},{"id":"matching","label":"Explains nearby driver discovery and matching"},{"id":"location","label":"Handles high-volume driver location updates"},{"id":"state","label":"Models trips and prevents conflicting assignments"},{"id":"scale","label":"Addresses geographic partitioning and regional scale"},{"id":"reliability","label":"Covers timeouts, cancellations, and recovery"},{"id":"tradeoffs","label":"Discusses consistency and matching trade-offs"}]'::jsonb),
  ('design-video-streaming', '[{"id":"requirements","label":"Clarifies upload, playback, and quality requirements"},{"id":"ingestion","label":"Designs upload validation and media ingestion"},{"id":"transcoding","label":"Uses asynchronous workers for encoding and packaging"},{"id":"storage","label":"Plans durable object storage and metadata"},{"id":"delivery","label":"Uses CDN delivery and adaptive bitrate playback"},{"id":"scale","label":"Addresses global traffic and hot content"},{"id":"reliability","label":"Covers processing retries and playback resilience"},{"id":"tradeoffs","label":"Discusses quality, latency, and storage costs"}]'::jsonb),
  ('design-ticket-booking', '[{"id":"requirements","label":"Clarifies inventory, holds, and checkout requirements"},{"id":"api","label":"Defines search, seat hold, and booking APIs"},{"id":"inventory","label":"Models events, seats, and availability"},{"id":"concurrency","label":"Prevents double booking during contention"},{"id":"checkout","label":"Handles payments, expiration, and idempotency"},{"id":"scale","label":"Addresses high-demand releases and queueing"},{"id":"reliability","label":"Covers recovery and consistency of reservations"},{"id":"tradeoffs","label":"Discusses fairness, throughput, and user experience"}]'::jsonb)
) as rubric(slug, items)
join public.problems p on p.slug = rubric.slug
on conflict (problem_id) do update set
  items = excluded.items,
  pass_threshold = excluded.pass_threshold;

update public.problems set visualizer_trace = case slug
  when 'two-sum' then '[{"step":1,"caption":"Start with an empty map","state":{"seen":[]}},{"step":2,"caption":"Look for the complement of 7","state":{"current":7,"needed":2,"seen":[[2,0]]}},{"step":3,"caption":"The complement is already in the map","state":{"answer":[0,1],"values":[2,7]}}]'::jsonb
  when 'valid-parentheses' then '[{"step":1,"caption":"Read the opening bracket","state":{"current":"(","stack":["("]}},{"step":2,"caption":"The closing bracket matches the stack top","state":{"current":")","stack":[]}},{"step":3,"caption":"No unmatched brackets remain","state":{"valid":true,"stack":[]}}]'::jsonb
  when 'merge-intervals' then '[{"step":1,"caption":"Sort intervals by their start","state":{"intervals":[[1,3],[2,6],[8,10]]}},{"step":2,"caption":"The first two intervals overlap","state":{"merged":[[1,6]],"next":[8,10]}},{"step":3,"caption":"Keep the disjoint interval","state":{"merged":[[1,6],[8,10]]}}]'::jsonb
  when 'best-time-to-buy-and-sell-stock' then '[{"step":1,"caption":"Track the lowest price so far","state":{"price":7,"minimum":7,"bestProfit":0}},{"step":2,"caption":"A later price gives a profit of 5","state":{"price":7,"minimum":1,"bestProfit":6}},{"step":3,"caption":"Keep the best earlier buy and later sell","state":{"buyPrice":1,"sellPrice":7,"bestProfit":6}}]'::jsonb
  when 'longest-substring-without-repeating-characters' then '[{"step":1,"caption":"Expand the window with new characters","state":{"window":"abc","left":0,"right":2,"best":3}},{"step":2,"caption":"A repeated character moves the left edge","state":{"window":"bca","left":1,"right":3,"best":3}},{"step":3,"caption":"Record the longest distinct window","state":{"longest":"abc","length":3}}]'::jsonb
  when 'product-of-array-except-self' then '[{"step":1,"caption":"Build prefix products from the left","state":{"prefix":[1,1,2,6]}},{"step":2,"caption":"Walk backward with suffix product","state":{"suffix":4,"result":[24,12,8,6]}},{"step":3,"caption":"Each result combines both sides","state":{"input":[1,2,3,4],"output":[24,12,8,6]}}]'::jsonb
  when 'maximum-subarray' then '[{"step":1,"caption":"Start a running sum","state":{"value":-2,"current":-2,"best":-2}},{"step":2,"caption":"Restart when the previous sum hurts","state":{"value":4,"current":4,"best":4}},{"step":3,"caption":"Extend the best contiguous range","state":{"subarray":[4,-1,2,1],"best":6}}]'::jsonb
  when 'reverse-linked-list' then '[{"step":1,"caption":"Begin with no previous node","state":{"previous":null,"current":1,"next":2}},{"step":2,"caption":"Reverse the current pointer","state":{"previous":1,"current":2,"next":3}},{"step":3,"caption":"The old tail is the new head","state":{"list":"3 → 2 → 1 → null"}}]'::jsonb
  when 'linked-list-cycle' then '[{"step":1,"caption":"Move the pointers at different speeds","state":{"slow":1,"fast":2}},{"step":2,"caption":"Advance slow once and fast twice","state":{"slow":2,"fast":1}},{"step":3,"caption":"The pointers meet, so a cycle exists","state":{"slow":3,"fast":3,"hasCycle":true}}]'::jsonb
  when 'binary-tree-level-order-traversal' then '[{"step":1,"caption":"Start the queue with the root","state":{"queue":[3],"levels":[]}},{"step":2,"caption":"Visit the first level and enqueue children","state":{"queue":[9,20],"levels":[[3]]}},{"step":3,"caption":"Collect nodes one level at a time","state":{"levels":[[3],[9,20],[15,7]]}}]'::jsonb
  else null
end
where slug in (
  'two-sum', 'valid-parentheses', 'merge-intervals', 'best-time-to-buy-and-sell-stock',
  'longest-substring-without-repeating-characters', 'product-of-array-except-self',
  'maximum-subarray', 'reverse-linked-list', 'linked-list-cycle',
  'binary-tree-level-order-traversal'
);
