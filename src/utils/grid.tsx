import React, { useRef, useEffect } from "react";

// This function adjust each item in the grid accordlying
// with their height.
// Each item has to have an inner container, used to calculate
// its overflow. Check GridItem component for an example.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adjustGridItemsHeight(grid: any) {
  const items = grid.children;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    const rowSpan = Math.ceil(
      (item.firstChild.getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );

    item.style.gridRowEnd = "span " + rowSpan;
    // item.style.gridColumnEnd = 'span ' + 2;
  }
}

export interface CardProps {
  children?: React.ReactNode;
}

const Grid: React.FC<CardProps> = ({ children }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    adjustGridItemsHeight(grid);
  });

  return (
    <div className="m-container__grid-wrapper" ref={gridRef}>
      {children}
    </div>
  );
};

export default Grid;
