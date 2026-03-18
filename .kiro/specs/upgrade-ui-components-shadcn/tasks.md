# Implementation Plan: Upgrade UI Components to shadcn/ui

## Overview

This implementation plan outlines the migration of 12 UI components to shadcn/ui following a three-phase approach. The migration maintains backward compatibility through wrapper components while improving accessibility, maintainability, and visual consistency. Each phase builds incrementally, with foundational components first, followed by interactive and complex components.

## Tasks

- [ ] 1. Set up shadcn/ui infrastructure
  - [ ] 1.1 Initialize shadcn/ui in the project
    - Run `npx shadcn@latest init` to set up configuration
    - Configure `components.json` with project settings
    - Set up Tailwind CSS integration
    - _Requirements: 18.1, 19.1_

  - [ ] 1.2 Install required dependencies
    - Install @radix-ui/react-* primitives (dialog, select, checkbox, accordion, etc.)
    - Install class-variance-authority, clsx, tailwind-merge
    - Verify package.json contains all required dependencies
    - _Requirements: 18.1_

  - [ ] 1.3 Configure theme with #ED0577 primary color
    - Create/update `src/lib/utils.ts` with cn utility function
    - Configure CSS variables in globals.css for primary color
    - Set up color tokens for all component variants
    - _Requirements: 14.1, 16.1_

  - [ ] 1.4 Create component directory structure
    - Create `src/components/ui/shadcn` directory
    - Set up index exports for component organization
    - Create migration wrapper directory `src/components/ui/wrappers`
    - _Requirements: 17.1_

- [ ] 2. Phase 1: Foundational Components
  - [ ] 2.1 Implement Button wrapper component
    - Create `src/components/ui/wrappers/Button.tsx`
    - Implement variant handling (primary, secondary, ghost, danger)
    - Implement size variants (sm, default, lg)
    - Add loading state and icon support
    - _Requirements: 2.1, 2.2, 2.3_

    - [ ]* 2.1.1 Write unit tests for Button component
      - Test variant rendering (primary, secondary, ghost, danger)
      - Test size application (sm, default, lg)
      - Test onClick handler invocation
      - Test disabled and loading states
      - _Requirements: 2.1, 2.2, 2.3_

    - [ ]* 2.1.2 Write property test for Button variant consistency
      - **Property 1: Button Variant Consistency**
      - **Validates: Requirements 2.1, 2.2**

    - [ ]* 2.1.3 Write property test for Button size application
      - **Property 2: Button Size Application**
      - **Validates: Requirements 2.3**

    - [ ]* 2.1.4 Write accessibility tests for Button
      - Test ARIA attributes
      - Test keyboard navigation
      - Test focus management
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 2.2 Implement Input wrapper component
    - Create `src/components/ui/wrappers/Input.tsx`
    - Implement input types (text, number, date, email, search)
    - Add label and error message support
    - Implement #ED0577 focus ring styling
    - Add debounce functionality
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

    - [ ]* 2.2.1 Write unit tests for Input component
      - Test input type rendering
      - Test label association
      - Test error state styling
      - Test disabled and readonly states
      - _Requirements: 5.1, 5.3, 5.4_

    - [ ]* 2.2.2 Write property test for Input focus ring styling
      - **Property 6: Input Focus Ring Styling**
      - **Validates: Requirements 5.2**

    - [ ]* 2.2.3 Write property test for Input error state styling
      - **Property 7: Input Error State Styling**
      - **Validates: Requirements 5.3, 5.6**

    - [ ]* 2.2.4 Write accessibility tests for Input
      - Test aria-describedby association
      - Test error announcement
      - Test focus indicators
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 2.3 Implement Card wrapper component
    - Create `src/components/ui/wrappers/Card.tsx`
    - Implement order display with status badge
    - Add action buttons (edit, cancel, view details)
    - Implement responsive padding (p-3 mobile, p-4 desktop)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

    - [ ]* 2.3.1 Write unit tests for Card component
      - Test status badge color mapping
      - Test action button visibility
      - Test responsive padding
      - Test order data rendering
      - _Requirements: 3.1, 3.2, 3.3, 3.4_

    - [ ]* 2.3.2 Write property test for Card status badge color mapping
      - **Property 3: Card Status Badge Color Mapping**
      - **Validates: Requirements 3.3**

    - [ ]* 2.3.3 Write property test for Card responsive design
      - **Property 4: Card Responsive Design**
      - **Validates: Requirements 3.4_

    - [ ]* 2.3.4 Write accessibility tests for Card
      - Test action button keyboard navigation
      - Test status announcement
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 2.4 Implement Badge wrapper component
    - Create `src/components/ui/wrappers/Badge.tsx`
    - Implement variant colors (submitted: blue, waiting: amber, closed: green, cancelled: red)
    - Add rounded-full, px-2 py-0.5, text-xs styling
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

    - [ ]* 2.4.1 Write unit tests for Badge component
      - Test variant color rendering
      - Test styling consistency
      - Test children rendering
      - _Requirements: 10.1, 10.2, 10.3, 10.4_

    - [ ]* 2.4.2 Write property test for Badge color mapping
      - **Property 12: Badge Color Mapping**
      - **Validates: Requirements 10.1, 10.4_

    - [ ]* 2.4.3 Write accessibility tests for Badge
      - Test color contrast ratios
      - Test screen reader compatibility
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 2.5 Checkpoint - Phase 1 completion
    - Ensure all Phase 1 tests pass
    - Run unit tests for Button, Input, Card, Badge
    - Run property-based tests for all Phase 1 properties
    - Run accessibility tests for all Phase 1 components
    - Ask the user if questions arise.

- [ ] 3. Phase 2: Interactive Components
  - [ ] 3.1 Implement Dialog wrapper component
    - Create `src/components/ui/wrappers/Dialog.tsx`
    - Implement Radix UI Dialog primitive
    - Add size variants (sm, md, lg, xl)
    - Implement focus trapping and escape key handling
    - Add overlay with 50% opacity black background
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

    - [ ]* 3.1.1 Write unit tests for Dialog component
      - Test open/close behavior
      - Test size variants
      - Test title and description rendering
      - Test close button functionality
      - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

    - [ ]* 3.1.2 Write property test for Dialog accessibility pattern
      - **Property 5: Dialog Accessibility Pattern**
      - **Validates: Requirements 4.1, 4.2, 4.3, 4.4_

    - [ ]* 3.1.3 Write accessibility tests for Dialog
      - Test ARIA dialog role
      - Test focus trapping
      - Test escape key handling
      - Test screen reader announcements
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 3.2 Implement Select wrapper component
    - Create `src/components/ui/wrappers/Select.tsx`
    - Implement single and multi-select modes
    - Add keyboard navigation (arrow keys, enter, escape)
    - Implement error state styling
    - Preserve gray background and border styling
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

    - [ ]* 3.2.1 Write unit tests for Select component
      - Test single select functionality
      - Test multi-select functionality
      - Test option rendering
      - Test error state display
      - _Requirements: 6.1, 6.2, 6.3, 6.4_

    - [ ]* 3.2.2 Write property test for Select keyboard navigation
      - **Property 8: Select Keyboard Navigation**
      - **Validates: Requirements 6.5_

    - [ ]* 3.2.3 Write accessibility tests for Select
      - Test ARIA combobox role
      - Test keyboard navigation
      - Test option announcement
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 3.3 Implement Checkbox wrapper component
    - Create `src/components/ui/wrappers/Checkbox.tsx`
    - Implement checked state with #ED0577 indicator
    - Add label association with htmlFor pattern
    - Implement disabled state
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

    - [ ]* 3.3.1 Write unit tests for Checkbox component
      - Test checked state rendering
      - Test label association
      - Test disabled state
      - Test onChange callback
      - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

    - [ ]* 3.3.2 Write property test for Checkbox state and accessibility
      - **Property 9: Checkbox State and Accessibility**
      - **Validates: Requirements 7.1, 7.2, 7.3, 7.5_

    - [ ]* 3.3.3 Write accessibility tests for Checkbox
      - Test ARIA checkbox role
      - Test checked state announcement
      - Test keyboard activation
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 3.4 Implement DropdownMenu wrapper component
    - Create `src/components/ui/wrappers/DropdownMenu.tsx`
    - Implement trigger rendering
    - Add user info display (name, email)
    - Implement logout option
    - Add click-outside-to-close behavior
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

    - [ ]* 3.4.1 Write unit tests for DropdownMenu component
      - Test trigger rendering
      - Test user info display
      - Test logout option functionality
      - Test menu open/close behavior
      - _Requirements: 11.1, 11.2, 11.3_

    - [ ]* 3.4.2 Write property test for DropdownMenu keyboard navigation
      - **Property 13: DropdownMenu Keyboard Navigation**
      - **Validates: Requirements 11.4_

    - [ ]* 3.4.3 Write accessibility tests for DropdownMenu
      - Test ARIA menu role
      - Test keyboard navigation
      - Test item announcement
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 3.5 Checkpoint - Phase 2 completion
    - Ensure all Phase 2 tests pass
    - Run unit tests for Dialog, Select, Checkbox, DropdownMenu
    - Run property-based tests for all Phase 2 properties
    - Run accessibility tests for all Phase 2 components
    - Ask the user if questions arise.

- [ ] 4. Phase 3: Complex Components
  - [ ] 4.1 Implement Accordion wrapper component
    - Create `src/components/ui/wrappers/Accordion.tsx`
    - Implement single and multiple expansion modes
    - Add validation indicators (error dots, completion dots)
    - Implement smooth transition animations
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

    - [ ]* 4.1.1 Write unit tests for Accordion component
      - Test single expansion mode
      - Test multiple expansion mode
      - Test validation indicator display
      - Test toggle callback
      - _Requirements: 8.1, 8.2, 8.3, 8.4_

    - [ ]* 4.1.2 Write property test for Accordion toggle behavior
      - **Property 10: Accordion Toggle Behavior**
      - **Validates: Requirements 8.2, 8.5_

    - [ ]* 4.1.3 Write accessibility tests for Accordion
      - Test ARIA accordion role
      - Test expand/collapse announcement
      - Test keyboard navigation
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 4.2 Implement Pagination wrapper component
    - Create `src/components/ui/wrappers/Pagination.tsx`
    - Implement page number display with ellipsis
    - Add active page styling with #ED0577 background
    - Implement items per page selector
    - Add showing info text
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

    - [ ]* 4.2.1 Write unit tests for Pagination component
      - Test page number rendering
      - Test ellipsis display
      - Test active page styling
      - Test page change callback
      - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

    - [ ]* 4.2.2 Write property test for Pagination active page styling
      - **Property 11: Pagination Active Page Styling**
      - **Validates: Requirements 9.5_

    - [ ]* 4.2.3 Write accessibility tests for Pagination
      - Test navigation role
      - Test page number announcement
      - Test keyboard navigation
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 4.3 Implement EmptyState wrapper component
    - Create `src/components/ui/wrappers/EmptyState.tsx`
    - Implement variant content mapping (orders, outlets, search, offline, error)
    - Add action button support
    - Implement aria-live attributes for announcements
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

    - [ ]* 4.3.1 Write unit tests for EmptyState component
      - Test variant content rendering
      - Test icon display
      - Test action button functionality
      - Test title and description display
      - _Requirements: 12.1, 12.2, 12.3_

    - [ ]* 4.3.2 Write property test for EmptyState variant content
      - **Property 14: EmptyState Variant Content**
      - **Validates: Requirements 12.1, 12.2, 12.3_

    - [ ]* 4.3.3 Write accessibility tests for EmptyState
      - Test aria-live region
      - Test icon announcement
      - Test action button accessibility
      - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 4.4 Checkpoint - Phase 3 completion
    - Ensure all Phase 3 tests pass
    - Run unit tests for Accordion, Pagination, EmptyState
    - Run property-based tests for all Phase 3 properties
    - Run accessibility tests for all Phase 3 components
    - Ask the user if questions arise.

- [ ] 5. Integration and Verification
  - [ ] 5.1 Update component exports
    - Create `src/components/ui/wrappers/index.ts`
    - Export all wrapper components
    - Update `src/components/index.ts` to use new wrappers
    - _Requirements: 13.1, 13.2, 13.3_

  - [ ] 5.2 Write wrapper API compatibility tests
    - Create integration tests for existing component usage
    - Verify props are passed correctly to shadcn components
    - Verify rendered output matches expected structure
    - **Property 15: Wrapper API Compatibility**
    - **Validates: Requirements 13.1, 13.2, 13.3**

  - [ ] 5.3 Write theme color application tests
    - Verify #ED0577 is applied to interactive states
    - Verify focus rings use primary color
    - Verify active states use primary color
    - **Property 16: Theme Color Application**
    - **Validates: Requirements 14.1_

  - [ ] 5.4 Write accessibility compliance tests
    - Run comprehensive accessibility audit
    - Verify WCAG 2.1 AA compliance
    - Test all components with axe-core
    - **Property 17: Accessibility Compliance**
    - **Validates: Requirements 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ] 5.5 Perform bundle size analysis
    - Run production build
    - Measure bundle size before and after migration
    - Verify increase is within 10% threshold
    - **Property 18: Bundle Size Constraint**
    - **Validates: Requirements 20.1_

  - [ ] 5.6 Verify tree-shaking effectiveness
    - Create test build with unused components
    - Verify unused components not in bundle
    - **Property 20: Tree-Shaking Effectiveness**
    - **Validates: Requirements 20.3_

  - [ ] 5.7 Run visual regression tests
    - Capture baseline screenshots
    - Run visual regression tests for all components
    - Review and approve visual changes
    - _Requirements: 16.1_

  - [ ] 5.8 Run performance tests
    - Measure FCP, LCP, FID, CLS metrics
    - Verify performance thresholds are met
    - _Requirements: 20.2_

- [ ] 6. Final Checkpoint - Migration Complete
  - Ensure all tests pass
  - Verify bundle size constraint
  - Verify accessibility compliance
  - Update documentation
  - Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All tests should be run with minimal verbosity: `npm test -- --silent`