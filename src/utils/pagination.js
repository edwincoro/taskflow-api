export const buildPaginationData = (page, limit, totalItems) => {
  const normalizedPage = Number(page) > 0 ? Number(page) : 1;
  const normalizedLimit = Number(limit) > 0 ? Number(limit) : 10;

  return {
    page: normalizedPage,
    limit: normalizedLimit,
    totalItems,
    totalPages: totalItems === 0 ? 0 : Math.ceil(totalItems / normalizedLimit),
  };
};
