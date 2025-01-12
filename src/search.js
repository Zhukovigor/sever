// search.js

/**
 * Function to search ads based on a query
 * @param {Array} ads - List of ads
 * @param {String} query - Search query
 * @returns {Array} - Filtered ads based on search query
 */
export const searchAds = (ads, query) => {
  const lowerCaseQuery = query.toLowerCase();
  return ads.filter(ad =>
    ad.title.toLowerCase().includes(lowerCaseQuery) ||
    ad.description.toLowerCase().includes(lowerCaseQuery)
  );
};