import React, { useRef, useEffect } from "react";

// This function adjust each item in the grid accordlying
// with their height.
// Each item has to have an inner container, used to calculate
// its overflow. Check GridItem component for an example.
export const adjustGridItemsHeight = (
  item: HTMLElement,
  childItem: Element
) => {
  const container = childItem.closest(".m-container__grid-wrapper");
  if (!item || !childItem || !container) {
    return;
  }
  const rowHeight = parseInt(
    window.getComputedStyle(container).getPropertyValue("grid-auto-rows")
  );
  const rowGap = parseInt(
    window.getComputedStyle(container).getPropertyValue("grid-row-gap")
  );
  const rowSpan = Math.ceil(
    (childItem.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
  );
  item.style.gridRowEnd = "span " + rowSpan;
};

export interface CardProps {
  children?: React.ReactNode;
}

const Grid: React.FC<CardProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const items = ref.current.children;
      for (let i = 0; i < items.length; i++) {
        adjustGridItemsHeight(
          items[i] as HTMLElement,
          items[i].firstChild as Element
        );
      }
    }
  });

  return (
    <div className="m-container__grid-wrapper" ref={ref}>
      {children}
    </div>
  );
};

export default Grid;
