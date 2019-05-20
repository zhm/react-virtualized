/**       */
import * as React from 'react';
import SortIndicator from './SortIndicator';
                                                  

/**
 * Default table header renderer.
 */
export default function defaultHeaderRenderer({
  dataKey,
  label,
  sortBy,
  sortDirection,
}                      ) {
  const showSortIndicator = sortBy === dataKey;
  const children = [
    <span
      className="ReactVirtualized__Table__headerTruncatedText"
      key="label"
      title={typeof label === 'string' ? label : null}>
      {label}
    </span>,
  ];

  if (showSortIndicator) {
    children.push(
      <SortIndicator key="SortIndicator" sortDirection={sortDirection} />,
    );
  }

  return children;
}
