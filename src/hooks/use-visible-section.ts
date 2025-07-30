import { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useVisibleSection(sections: Array<{ id: string }>) {
  const [visibleSectionId, setVisibleSectionId] = useState<
    string | undefined
  >();

  // Use useCallback to memoize the handler function.
  // This ensures the same function reference is used for add/removeEventListener
  // and prevents re-creating it on every render.
  const checkVisibility = useCallback(() => {
    // Find the first section that is considered "visible".
    // A common and more flexible approach is to find the section
    // that is currently closest to the top of the viewport or crossing a
    // certain threshold (e.g., the vertical center of the screen).
    const viewportCenter = window.innerHeight / 2;

    const firstVisibleSection = sections.find((section) => {
      const element = document.getElementById(section.id);
      if (!element) return false;

      const rect = element.getBoundingClientRect();

      // This logic considers a section "visible" if its top is above the
      // viewport's vertical center and its bottom is below it.
      // This works well for sections of varying heights.
      return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
    });

    // Only update state if the visible section has changed.
    if (firstVisibleSection && firstVisibleSection.id !== visibleSectionId) {
      setVisibleSectionId(firstVisibleSection.id);
    }
    // If no section is "active" but one was before, clear it.
    // This is optional, depending on desired behavior.
    else if (!firstVisibleSection && visibleSectionId) {
      // You could set it to the first section's ID as a default.
      setVisibleSectionId(sections[0]?.id);
    }
  }, [sections, visibleSectionId]); // Rerun if sections or the current ID changes.

  // Memoize the throttled function to maintain a stable reference.
  const throttledCheckVisibility = useMemo(
    () => throttle(checkVisibility, 100), // 100ms is a common throttle delay
    [checkVisibility]
  );

  useEffect(() => {
    // Set the initial visible section on component mount.
    checkVisibility();

    window.addEventListener("scroll", throttledCheckVisibility);
    window.addEventListener("resize", throttledCheckVisibility);

    // Cleanup function: remove the event listener.
    // Because throttledCheckVisibility has a stable reference from useMemo,
    // this will correctly remove the exact same listener that was added.
    return () => {
      window.removeEventListener("scroll", throttledCheckVisibility);
      window.removeEventListener("resize", throttledCheckVisibility);
      throttledCheckVisibility.cancel(); // Lodash-specific: cancel any pending executions
    };
  }, [checkVisibility, throttledCheckVisibility]); // Effect depends on the checkVisibility function.

  return visibleSectionId;
}
