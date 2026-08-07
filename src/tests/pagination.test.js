import test from 'node:test';
import assert from 'node:assert/strict';

import { buildPaginationData } from '../utils/pagination.js';

test('buildPaginationData calculates pagination metadata correctly', () => {
  const pagination = buildPaginationData(2, 10, 45);

  assert.deepEqual(pagination, {
    page: 2,
    limit: 10,
    totalItems: 45,
    totalPages: 5,
  });
});

test('buildPaginationData handles empty results', () => {
  const pagination = buildPaginationData(1, 10, 0);

  assert.deepEqual(pagination, {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });
});
