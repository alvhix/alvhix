---
title: 'Calculate the number of islands in a 2D grid'
description: 'Calculate the number of islands in a 2D grid using Breadth-First Search (BFS).'
pubDate: 'Nov 01 2025'
updatedDate: 'Nov 01 2025'
heroImage: '/images/number-of-islands/number-of-islands.drawio.svg'
draft: true
tags:
  - 'algorithms'
  - 'breadth-first-search'
  - 'data-structures'
  - 'queue'
---

# Problem statement

Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.

# Solution

To solve this problem we need to think in the bidimensional array as a graph that can be traversed with the breadth-first search algorithm. If we find in a step all nodes as zeros then we can consider that next ones that we can find are islands. To illustrate it let's see an example:

# Code

# Complexity analysis
