# Requirements Document: Upgrade UI Components to shadcn/ui

## Introduction

This document defines requirements for migrating the Pink Pin Merchant App's custom UI components to the shadcn/ui component library. The migration aims to improve code maintainability, accessibility, and visual consistency while preserving all existing functionality. shadcn/ui is a collection of reusable components built with Radix UI primitives and Tailwind CSS, providing excellent accessibility and customization capabilities.

## Glossary

- **shadcn/ui**: A component library using Radix UI primitives and Tailwind CSS
- **Radix UI**: Unstyled, accessible UI primitives for building custom design systems
- **Component Migration**: Replacing custom-built components with shadcn/ui equivalents while preserving functionality
- **Design Tokens**: CSS custom properties for theming (colors, spacing, typography)
- **Migration Wrapper**: A compatibility layer that adapts shadcn components to existing component APIs

## Requirements

### Requirement 1: shadcn/ui Installation and Configuration

**User Story:** As a developer, I want to install and configure shadcn/ui properly, so that the component library is ready for migration.

#### Acceptance Criteria

1. WHEN the project is initialized with shadcn/ui CLI, THE System SHALL install all required dependencies including Radix UI primitives, class-variance-authority, clsx, and tailwind-merge.
2. THE System SHALL configure the components.json file with correct paths for Next.js App Router structure.
3. THE System SHALL integrate shadcn/ui CSS variables with the existing Tailwind configuration.
4. THE System SHALL preserve the existing custom color palette (primary: #ED0577, status colors) in the CSS variables.
5. WHERE dark mode support is needed, THE System SHALL configure CSS variables for both light and dark themes.

### Requirement 2: Button Component Migration

**User Story:** As a user, I want consistent button interactions across the application, so that I can easily understand and use button actions.

#### Acceptance Criteria

1. THE Button component SHALL support all existing variants: primary (#ED0577), secondary (outline), ghost, and danger (red for cancel actions).
2. WHEN a button is clicked, THE System SHALL trigger the same callback as the current implementation.
3. THE Button SHALL maintain the existing size variants: sm (text-xs), default (text-sm), and lg (text-base).
4. THE Button SHALL preserve the existing disabled state styling and behavior.
5. WHERE icon-only buttons are used, THE Button SHALL support the leading and trailing icon props.
6. THE Button SHALL maintain the existing focus ring styling (#ED0577 with 2px offset and 2px blur).

### Requirement 3: Card Component Migration

**User Story:** As a user, I want consistent card layouts for displaying order information, so that I can quickly scan and understand order details.

#### Acceptance Criteria

1. THE Card component SHALL display order information including invoice number, status badge, recipient name, address, distance, service type, shipping fee, and creation date.
2. THE Card SHALL preserve the existing hover behavior showing action buttons (edit, cancel, detail).
3. THE Card status badge SHALL use the existing color mapping: submitted (blue), waiting (amber), closed (green), cancelled (red).
4. THE Card SHALL maintain responsive design: compact on mobile (p-3), full on larger screens (p-4).
5. THE Card SHALL preserve keyboard accessibility with visible focus indicators.
6. THE Card SHALL maintain the offline and pending sync badge overlays.

### Requirement 4: Dialog Component Migration

**User Story:** As a user, I want accessible modal dialogs for confirmations and order details, so that I can complete actions without losing context.

#### Acceptance Criteria

1. THE Dialog component SHALL implement the WAI-ARIA dialog pattern with proper roles and attributes.
2. WHEN the dialog opens, THE System SHALL trap focus within the dialog.
3. WHEN the escape key is pressed, THE Dialog SHALL close.
4. WHEN the dialog opens, THE System SHALL focus the first interactive element.
5. THE Dialog SHALL maintain the existing overlay styling (black with 50% opacity).
6. THE Dialog SHALL support the existing animation transitions.
7. WHERE confirmation dialogs are used, THE Dialog SHALL display order details (invoice number, recipient name).

### Requirement 5: Form Input Components Migration

**User Story:** As a user, I want accessible and validated form inputs, so that I can enter data correctly with clear error feedback.

#### Acceptance Criteria

1. THE Input component SHALL support the existing types: text, number, date, email, and search.
2. THE Input SHALL maintain the existing focus ring styling (#ED0577).
3. THE Input SHALL preserve the existing error state styling (red border, red background).
4. THE Input SHALL maintain the existing placeholder and label styling.
5. THE Input SHALL support the existing disabled and readonly states.
6. THE Input SHALL preserve the existing aria-invalid and aria-describedby attributes for accessibility.
7. THE Input SHALL maintain the existing debounced input behavior for search fields.

### Requirement 6: Select Component Migration

**User Story:** As a user, I want accessible dropdown select controls, so that I can filter and select options efficiently.

#### Acceptance Criteria

1. THE Select component SHALL display all existing filter options: status, service type, outlet, and date ranges.
2. THE Select SHALL maintain the existing styling (gray background, border, focus ring).
3. THE Select SHALL preserve the existing placeholder text and default options.
4. THE Select SHALL support multi-select for status and service type filters.
5. THE Select SHALL maintain keyboard navigation (arrow keys, enter to select).
6. THE Select SHALL preserve the existing responsive design (full width on mobile).

### Requirement 7: Checkbox Component Migration

**User Story:** As a user, I want accessible checkboxes for form selections, so that I can mark items as selected or not.

#### Acceptance Criteria

1. THE Checkbox component SHALL maintain the existing checked and unchecked states.
2. THE Checkbox SHALL preserve the existing styling (#ED0577 for checked state).
3. THE Checkbox SHALL maintain the existing label association.
4. THE Checkbox SHALL support the existing disabled state.
5. THE Checkbox SHALL preserve keyboard accessibility (space to toggle).

### Requirement 8: Accordion Component Migration

**User Story:** As a user, I want collapsible form sections, so that I can focus on one part of the form at a time.

#### Acceptance Criteria

1. THE Accordion component SHALL display form sections: Recipient, Delivery, Items, Package.
2. THE Accordion SHALL maintain the existing toggle behavior (click header to expand/collapse).
3. THE Accordion SHALL preserve the existing validation indicators (error dots, completion dots).
4. THE Accordion SHALL maintain keyboard navigation (enter/space to toggle).
5. THE Accordion SHALL preserve the existing smooth transition animations.
6. THE Accordion SHALL maintain the existing responsive header sizing (larger touch targets on mobile).

### Requirement 9: Pagination Component Migration

**User Story:** As a user, I want accessible pagination controls, so that I can navigate through large order lists efficiently.

#### Acceptance Criteria

1. THE Pagination component SHALL display page numbers with ellipsis for large page counts.
2. THE Pagination SHALL maintain the existing showing info (e.g., "Showing 1 to 20 of 100 orders").
3. THE Pagination SHALL preserve the previous/next button navigation.
4. THE Pagination SHALL maintain keyboard navigation (arrow keys between pages).
5. THE Pagination SHALL preserve the existing active page styling (#ED0577 background).
6. THE Pagination SHALL maintain the existing disabled state styling.

### Requirement 10: Badge Component Migration

**User Story:** As a user, I want consistent status indicators, so that I can quickly identify order statuses.

#### Acceptance Criteria

1. THE Badge component SHALL support the existing status colors: submitted, waiting, closed, cancelled.
2. THE Badge SHALL maintain the existing label text mapping (e.g., "Shipment Created" for submitted).
3. THE Badge SHALL preserve the existing styling (rounded-full, px-2 py-0.5, text-xs).
4. THE Badge SHALL support the existing background and text color combinations.

### Requirement 11: Dropdown Menu Component Migration

**User Story:** As a user, I want accessible user menu dropdowns, so that I can access user actions like logout.

#### Acceptance Criteria

1. THE DropdownMenu component SHALL display the user menu with user info and logout option.
2. THE DropdownMenu SHALL maintain the existing open/close behavior.
3. THE DropdownMenu SHALL preserve the existing click-outside-to-close behavior.
4. THE DropdownMenu SHALL maintain keyboard navigation (arrow keys, escape to close).
5. THE DropdownMenu SHALL preserve the existing styling and positioning.

### Requirement 12: Empty State Component Migration

**User Story:** As a user, I want clear empty state messages, so that I understand when no data is available.

#### Acceptance Criteria

1. THE EmptyState component SHALL support the existing variants: orders, outlets, search, offline, error.
2. THE EmptyState SHALL preserve the existing icon styling and sizing.
3. THE EmptyState SHALL maintain the existing title and description text.
4. THE EmptyState SHALL preserve the existing action button functionality.
5. THE EmptyState SHALL maintain the existing aria-live attributes for screen readers.

### Requirement 13: Migration Wrapper Pattern

**User Story:** As a developer, I want to maintain backward compatibility during migration, so that I can migrate components incrementally without breaking the application.

#### Acceptance Criteria

1. WHERE shadcn components have different APIs, THE System SHALL create wrapper components that adapt the shadcn API to the existing component API.
2. THE Wrapper components SHALL export the same props interface as the original components.
3. THE Wrapper components SHALL support all existing usage patterns in the codebase.
4. THE Wrapper components SHALL be marked for deprecation after full migration.
5. THE System SHALL provide migration comments indicating where shadcn components should be used directly.

### Requirement 14: Theme Integration

**User Story:** As a developer, I want the shadcn components to match the existing design system, so that the application maintains visual consistency.

#### Acceptance Criteria

1. THE shadcn components SHALL use the existing primary color (#ED0577) for interactive states.
2. THE shadcn components SHALL use the existing status colors for badges and indicators.
3. THE shadcn components SHALL match the existing border radius (rounded-lg for cards, rounded-md for buttons).
4. THE shadcn components SHALL use the existing font sizes and weights.
5. THE shadcn components SHALL maintain the existing shadow and border styling.

### Requirement 15: Accessibility Compliance

**User Story:** As a user with disabilities, I want accessible components, so that I can use the application effectively with assistive technologies.

#### Acceptance Criteria

1. THE System SHALL maintain WCAG 2.1 AA compliance for all migrated components.
2. THE System SHALL preserve all existing ARIA attributes and roles.
3. THE System SHALL maintain keyboard navigation patterns.
4. THE System SHALL preserve focus management in modals and dialogs.
5. THE System SHALL maintain screen reader announcements for dynamic content.
6. THE System SHALL preserve color contrast ratios for all text and interactive elements.

### Requirement 16: Testing Requirements

**User Story:** As a developer, I want comprehensive tests for migrated components, so that I can ensure functionality is preserved.

#### Acceptance Criteria

1. THE System SHALL maintain existing unit tests for all migrated components.
2. THE System SHALL update component tests to use shadcn component selectors.
3. THE System SHALL verify visual regression tests pass after migration.
4. THE System SHALL verify accessibility tests (axe-core) pass for all components.
5. THE System SHALL maintain integration tests that use the components.

### Requirement 17: Migration Priority and Phasing

**User Story:** As a project manager, I want a phased migration approach, so that we can deliver value incrementally and reduce risk.

#### Acceptance Criteria

1. PHASE 1: THE System SHALL migrate foundational components (Button, Input, Card, Badge) first.
2. PHASE 2: THE System SHALL migrate interactive components (Dialog, Select, Checkbox, DropdownMenu).
3. PHASE 3: THE System SHALL migrate complex components (Accordion, Pagination, EmptyState).
4. THE System SHALL provide a migration checklist for tracking progress.
5. THE System SHALL allow components to be migrated independently.

### Requirement 18: Dependency Management

**User Story:** As a developer, I want to manage new dependencies properly, so that the application remains stable and maintainable.

#### Acceptance Criteria

1. THE System SHALL add shadcn/ui dependencies: @radix-ui/react-*, class-variance-authority, clsx, tailwind-merge.
2. THE System SHALL verify compatibility with existing dependencies (Next.js 16, React 18, Tailwind 3.3).
3. THE System SHALL update package.json with exact versions for reproducibility.
4. THE System SHALL remove unused custom component code after migration.
5. THE System SHALL verify no duplicate dependencies are introduced.

### Requirement 19: Documentation Requirements

**User Story:** As a developer, I want clear documentation for migrated components, so that I can use them correctly.

#### Acceptance Criteria

1. THE System SHALL update component documentation to reflect shadcn usage.
2. THE System SHALL document any API differences between original and shadcn components.
3. THE System SHALL provide examples of wrapper component usage.
4. THE System SHALL document the migration progress and remaining components.
5. THE System SHALL update the component README with shadcn integration notes.

### Requirement 20: Performance Requirements

**User Story:** As a user, I want the application to remain fast after migration, so that I can complete tasks efficiently.

#### Acceptance Criteria

1. THE System SHALL ensure migrated components do not increase bundle size by more than 10%.
2. THE System SHALL verify component rendering performance is equivalent or better.
3. THE System SHALL ensure tree-shaking works correctly for unused shadcn components.
4. THE System SHALL lazy load any heavy components if needed.
5. THE System SHALL verify Core Web Vitals remain within acceptable thresholds.