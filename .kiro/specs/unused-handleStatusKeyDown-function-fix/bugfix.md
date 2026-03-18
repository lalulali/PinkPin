# Bugfix Requirements Document

## Introduction

The Next.js build fails with a type error in `src/components/FilterBar.tsx` because the function `handleStatusKeyDown` is referenced in the JSX but never defined. This blocks deployment and CI/CD pipelines.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the status filter buttons are rendered with `onKeyDown={handleStatusKeyDown}` THEN the TypeScript compiler reports "Cannot find name 'handleStatusKeyDown'" causing the Next.js build to fail
1.2 WHEN the build process runs THEN the type error prevents successful compilation of the FilterBar component

### Expected Behavior (Correct)

2.1 WHEN the status filter buttons have keyboard event handlers THEN the system SHALL define `handleStatusKeyDown` function to handle keyboard navigation for status options
2.2 WHEN the `handleStatusKeyDown` function is invoked with Enter or Space key THEN the system SHALL toggle the status filter selection
2.3 WHEN the `handleStatusKeyDown` function is invoked with ArrowRight or ArrowDown key THEN the system SHALL move focus to the next status option
2.4 WHEN the `handleStatusKeyDown` function is invoked with ArrowLeft or ArrowUp key THEN the system SHALL move focus to the previous status option

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the status filter buttons are clicked THEN the system SHALL CONTINUE TO toggle status filter selection as implemented in `handleStatusClick`
3.2 WHEN the service type filter buttons are used THEN the system SHALL CONTINUE TO work with the existing `handleServiceTypeKeyDown` function
3.3 WHEN the toggle button receives keyboard input THEN the system SHALL CONTINUE TO expand/collapse the filter bar with `handleToggleKeyDown`
3.4 WHEN other filter operations (date range, outlet, invoice, service type) are performed THEN the system SHALL CONTINUE TO function as before