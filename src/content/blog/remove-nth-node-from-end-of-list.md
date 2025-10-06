---
title: 'Remove Nth node from end of linked list'
description: 'A classic linked list problem that can be resolved with the two-pointer technique.'
pubDate: 'Oct 07 2025'
updatedDate: 'Oct 07 2025'
heroImage: '/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list.drawio.svg'
draft: false
tags:
  - 'algorithms'
  - 'two-pointer'
  - 'data-structures'
  - 'linked-list'
---

# Problem statement

Given the head of a linked list, remove the n-th node from the end of the list and return its head.

This problem can be solved in a single pass using the two-pointer technique. The two-pointer technique involves using two pointers to traverse the linked list at different speeds or with a specific distance between them. This approach is particularly useful for problems that require finding elements relative to the end of the list, such as removing the n-th node from the end.

![Introduction](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-introduction.svg 'Introduction - Remove the n-th node from the end of the list')

Red is the fast pointer and blue is the slow pointer.

# Solution

Let's break down the solution into clear steps, starting from the happy path where the list has more than `n` nodes.

## Step 1

Fast pointer will advance `n` steps ahead. Note that when `n` is equal to the length of the list, the fast pointer will be `null`

![Step 1](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-step-1.svg 'Step 1 - Fast pointer advances n steps ahead')

## Step 2

The slow pointer will start from the head and both pointers will advance one step at a time until the fast pointer reaches the end of the list. If we are already in the end of the list, it means we have to remove the head node.

![Step 2](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-step-2.svg 'Step 2 - Slow pointer advances n steps ahead')

## Step 3

At this point, the slow pointer will be at the node just before the one we want to remove. We can then adjust the `next` pointer of the slow pointer to skip the target node. The orphaned node will be removed by the garbage collector of your programming language, or you can manually free the memory if needed.

![Step 3](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-step-3.svg 'Step 3 - Remove the target node')

---

Until here we have covered the happy path, but there are some edge cases that we need to consider:

# If `n` is equal to the length of the list, we need to remove the head node.

![N is equal to legnth of the list](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-edge-case-1.svg 'Edge case')

Let's repeat the steps for this edge case:

## Step 1

Fast pointer will advance `n` steps ahead. Note that when `n` is equal to the length of the list, the fast pointer will be `null` because we have reached the end of the list.

![Step 1](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-edge-case-1-step-1.svg 'Step 1 - Fast pointer advances n steps ahead')

## Step 2

Fast pointer is already at the end of the list (is `null`), so we just need to remove the head node, no need to move the slow pointer.

![Step 2](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-edge-case-1-step-2.svg 'Step 2 - Remove the head node')

---

# If the list has only one node and `n` is 1, we need to return `null`.

![N is equal to legnth of the list](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-edge-case-2.svg 'Edge case')

Let's repeat the steps for this edge case:

## Step 1

Fast pointer will advance `n` steps ahead. Note that when `n` is equal to the length of the list, the fast pointer will be `null` because we have reached the end of the list.

![Step 1](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-edge-case-2-step-1.svg 'Step 1 - Fast pointer advances n steps ahead')

## Step 2

Fast pointer is already at the end of the list (is `null`), so we just need to remove the head node, no need to move the slow pointer.

![Step 2](/images/remote-nth-node-from-end-of-linked-list/remove-nth-node-from-end-of-list-edge-case-2-step-2.svg 'Step 2 - Remove the head node')

In both edge cases, we are taking the `head.next` as the new head of the list.

# Typescript implementation

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let fast = head;
  let slow = head;

  for (let i = 0; i < n; i++) {
    fast = fast!.next;
  }

  if (fast === null) {
    return head!.next;
  }

  while (fast.next !== null) {
    fast = fast.next;
    slow = slow!.next;
  }

  slow!.next = slow!.next!.next;

  return head;
}
```

# Complexity analysis

- Time complexity: O(n), where n is the length of the linked list. We traverse the list at most twice (once with the fast pointer and once with the slow pointer).
- Space complexity: O(1), as we are using only a constant amount of extra space for the two pointers.
