---
title: 'Sort a stack with another stack'
description: 'Sort a stack in ascending order using only one additional stack.'
pubDate: 'Nov 09 2025'
updatedDate: 'Nov 09 2025'
heroImage: '/images/sort-stack-with-another-stack/sort-stack-with-another-stack.drawio.png'
draft: false
tags:
  - 'algorithms'
  - 'data-structures'
  - 'stack'
---

# Problem statement

Given a stack, sort it in ascending order using only one additional stack.

> Constraints:
>
> - You may not use any other data structure such as arrays or linked lists.

# Solution

The problem can be solved using only one additional stack. We repeatedly move values between the two stacks, comparing the top elements (the "peek" values) to build a stack sorted in ascending order such that the smallest number ends up at the top of the sorted stack.

In this post I'll explain two approaches: the common double‑loop insertion method, and a single‑loop variation that was my first attempt.

Let's go for the most common solution with a double loop:

## Double loop solution

### Introduction

![Introduction](/images/sort-stack-with-another-stack/sort-stack-with-another-stack.introduction.svg 'Introduction')

We will need:

- An additional stack where we are going to store the stack sorted in ascending order.

We iterate through the original input stack:

#### Step 1

Pop the top of the input stack and store it in a temporary variable called `current`

If the sorted stack is empty, push `current` to the sorted stack and continue with the next element.

#### Step 2

While the sorted stack is not empty and `current > sortedStack.top()`:

- Pop from the sorted stack and push that element back onto the input stack.

This moves smaller elements back to the input so the larger `current` sinks lower in the sorted stack. When the loop finishes we know either the sorted stack is empty or its top is ≥ `current`.

#### Step 3

Push `current` onto the sorted stack. All elements below are ≥ `current`, and smaller elements will be reprocessed later to sit above it, preserving "smallest on top" ordering.

#### Example

Let's see an example with the input stack: `[5, 3, 1, 4, 2]`

<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-1.svg" alt="Step 1" title="Step 1 - First step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-2.svg" alt="Step 2" title="Step 2 - Second step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-3.svg" alt="Step 3" title="Step 3 - Third step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-4.svg" alt="Step 4" title="Step 4 - Fourth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-4-1.svg" alt="Step 4.1" title="Step 4.1 - Fourth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-4-2.svg" alt="Step 4.2" title="Step 4.2 - Fourth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-5.svg" alt="Step 5" title="Step 5 - Fifth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-6.svg" alt="Step 6" title="Step 6 - Sixth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-7.svg" alt="Step 7" title="Step 7 - Seventh step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-7-1.svg" alt="Step 7-1" title="Step 7.1 - Seventh step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.step-8.svg" alt="Step 8" title="Step 8 - Eighth step" loading="lazy">
</div>

<figcaption>Plain‑text execution trace for the double loop algorithm: 
  <a href="/txt/sort-stack-with-another-stack/double-loop.txt" title="Reference to txt - Sort stack with another stack">view trace</a>.
</figcaption>

#### Code

```typescript
export function sortStack(stack: Stack<number>): Stack<number> {
  const sortedStack = new Stack<number>();

  while (!stack.isEmpty()) {
    const current = stack.top()!;
    stack.pop();

    while (!sortedStack.isEmpty() && current > sortedStack.top()!) {
      const temp = sortedStack.top()!;
      sortedStack.pop();
      stack.push(temp);
    }
    sortedStack.push(current);
  }

  return sortedStack;
}
```

#### Complexity analysis

Time complexity: O(n²) in the worst case (reverse‑sorted input causes many reinsertions).  
Space complexity: O(n) for the auxiliary stack.

## Single loop solution

This solution is similar, but instead of an inner loop that repositions all out‑of‑order elements in one pass, it performs at most one adjustment per outer iteration. Let's examine it in more detail:

Iterate through the original input stack:

#### Step 1

Pop the top of the input stack and store it in a temporary variable (called `current`).

If the sorted stack is empty, push `current` to the sorted stack and continue with the next element from the input stack.

#### Step 2

If the sorted stack is not empty and `current > sortedStack.top()`:

- Pop from the sorted stack and push that element back onto the input stack.

This moves one smaller element out of the way so `current` can sink slightly lower.

Otherwise push `current` onto the sorted stack.

#### Example

Let's see the same example as with the double loop with the input stack: `[5, 3, 1, 4, 2]`

<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-1.svg" alt="Step 1" title="Step 1 - First step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-2.svg" alt="Step 2" title="Step 2 - Second step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-3.svg" alt="Step 3" title="Step 3 - Third step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-4.svg" alt="Step 4" title="Step 4 - Fourth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-4-1.svg" alt="Step 4.1" title="Step 4.1 - Fourth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-5.svg" alt="Step 5" title="Step 5 - Fifth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-5-1.svg" alt="Step 5.1" title="Step 5.1 - Fifth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-6.svg" alt="Step 6" title="Step 6 - Sixth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-7.svg" alt="Step 7" title="Step 7 - Seventh step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-8.svg" alt="Step 8" title="Step 8 - Eighth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-9.svg" alt="Step 9" title="Step 9 - Ninth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-9-1.svg" alt="Step 9-1" title="Step 9.1 - Ninth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-10.svg" alt="Step 10" title="Step 10 - Tenth step" loading="lazy">
  <img src="/images/sort-stack-with-another-stack/sort-stack-with-another-stack.single-step-11.svg" alt="Step 11" title="Step 11 - Eleventh step" loading="lazy">
</div>

<figcaption>Plain‑text execution trace for the single loop algorithm: 
  <a href="/txt/sort-stack-with-another-stack/single-loop.txt" title="Reference to txt - Sort stack with another stack">view trace</a>.
</figcaption>

#### Code

```typescript
export function sortStack(stack: Stack<number>): Stack<number> {
  const sortedStack = new Stack<number>();

  while (!stack.isEmpty()) {
    const current = stack.top()!;
    stack.pop();

    if (!sortedStack.isEmpty() && current > sortedStack.top()!) {
      const temp = sortedStack.top()!;
      sortedStack.pop();
      stack.push(temp);
      stack.push(current);
      continue;
    }
    sortedStack.push(current);
  }

  return sortedStack;
}
```

#### Complexity analysis

Time complexity: Still O(n²) worst‑case; the work is spread across more outer iterations instead of concentrated in inner loops.  
Space complexity: O(n) for the auxiliary stack.

# Conclusion

Both solutions effectively sort a stack using only one additional stack. The double loop solution is more straightforward and easier to understand, while the single loop solution is a bit more complex but achieves the same result with a slightly different approach. Depending on the specific requirements and constraints of your application, you may choose one over the other.

The single‑loop solution was my first attempt; by leveraging only stack operations (peek, pop, push) we can still reach a clean ascending ordering with the smallest element on top.
