# Design Document: Upgrade UI Components to shadcn/ui

## Overview

This design document outlines the technical approach for migrating the Pink Pin Merchant App's custom UI components to the shadcn/ui component library. The migration leverages shadcn/ui's foundation on Radix UI primitives and Tailwind CSS to improve code maintainability, accessibility, and visual consistency while preserving all existing functionality.

The migration follows a three-phase approach: foundational components (Button, Input, Card, Badge), interactive components (Dialog, Select, Checkbox, DropdownMenu), and complex components (Accordion, Pagination, EmptyState). This phased strategy enables incremental migration with continuous delivery of value and reduced risk.

The design emphasizes backward compatibility through a wrapper pattern that maintains existing component APIs while transitioning to shadcn/ui implementations. This approach allows components to be migrated independently and provides flexibility in the migration timeline.

### Design Goals

The primary design goals include maintaining WCAG 2.1 AA accessibility compliance throughout the migration, preserving the existing visual design with the primary color #ED0577, ensuring zero breaking changes to the application's functionality, and achieving performance metrics within 10% of current bundle size. The design also prioritizes developer experience by providing clear migration paths and documentation.

### Scope

This design covers the migration of 12 core UI components, the integration of shadcn/ui with the existing Tailwind CSS configuration, the implementation of theme variables for consistent styling, and the creation of wrapper components for backward compatibility. The scope excludes the migration of third-party components not owned by the application and changes to the application's business logic or data flow.

## Architecture

### System Architecture

The migration introduces a new component layer between the application pages and the shadcn/ui library. This layer consists of wrapper components that translate the existing component APIs to shadcn/ui implementations while maintaining identical behavior and appearance.

```
┌─────────────────────────────────────────────────────────────────┐
│                    Application Pages                             │
│  (OrderHistory, OrderCreationForm, Dashboard, etc.)              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              Migration Wrapper Layer                             │
│  (Button, Card, Dialog, Input, Select, Checkbox,                │
│   Accordion, Pagination, Badge, DropdownMenu, EmptyState)       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   shadcn/ui Library                             │
│  (Radix UI Primitives + Tailwind CSS + Utilities)               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              Tailwind CSS + Theme Variables                      │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

Each migrated component follows a consistent architecture pattern. The wrapper component receives props through the original interface, transforms them as needed for the shadcn/ui component, handles any necessary state management, and delegates rendering to the shadcn/ui primitive. This pattern ensures that all existing usage patterns continue to work without modification.

The wrapper components are organized in a dedicated directory structure that mirrors the existing component organization. This approach maintains code discoverability and provides clear boundaries between migrated and non-migrated components during the transition period.

### Utility Layer Architecture

The migration introduces a utility layer that provides common functionality used across wrapper components. This layer includes the `cn` utility function for class name composition, variant handling for component variations, and theme integration for consistent styling. These utilities are built on established libraries (clsx, tailwind-merge, class-variance-authority) that are already used by shadcn/ui.

## Components and Interfaces

### Button Component

The Button component migration preserves all existing variants and behaviors while leveraging shadcn/ui's Button component as the underlying implementation. The wrapper maintains the original prop interface to ensure complete backward compatibility.

**Props Interface:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'leading' | 'trailing';
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
}
```

**Implementation Strategy:**
The wrapper component uses shadcn/ui's Button with class-variance-authority (cva) to define the variant and size patterns. The primary variant applies the #ED0577 background color, while the danger variant uses a red color scheme for cancel actions. The size variants map to the existing text size classes (text-xs for sm, text-sm for default, text-base for lg).

### Card Component

The Card component displays order information with consistent styling and interactive behaviors. The migration preserves the existing card structure including the status badge, action buttons on hover, and responsive design.

**Props Interface:**
```typescript
interface CardProps {
  order: Order;
  onEdit?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
  onViewDetails?: (orderId: string) => void;
  className?: string;
}
```

**Implementation Strategy:**
The wrapper composes shadcn/ui's Card component with custom sub-components for the header, content, and footer sections. The status badge uses the Badge component with color mapping based on order status (submitted: blue, waiting: amber, closed: green, cancelled: red). The hover behavior for action buttons is implemented using CSS group-hover patterns.

### Dialog Component

The Dialog component provides modal functionality for confirmations and order details. The migration leverages Radix UI's Dialog primitive for accessibility while maintaining the existing visual design.

**Props Interface:**
```typescript
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}
```

**Implementation Strategy:**
The wrapper uses shadcn/ui's Dialog component which implements the WAI-ARIA dialog pattern including focus trapping, escape key handling, and proper ARIA attributes. The overlay uses the existing black background with 50% opacity. Animation transitions match the current implementation using CSS transitions.

### Input Component

The Input component handles form field rendering with validation states and accessibility features. The migration preserves all input types and states while improving accessibility through Radix UI.

**Props Interface:**
```typescript
interface InputProps {
  type?: 'text' | 'number' | 'date' | 'email' | 'search';
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  'aria-describedby'?: string;
  debounce?: number;
  className?: string;
}
```

**Implementation Strategy:**
The wrapper uses shadcn/ui's Input component with custom styling for error states and focus rings. The #ED0577 focus ring is applied using Tailwind's ring utilities. Error state styling uses red borders and backgrounds as specified. The debounced input behavior is implemented using a custom hook that wraps the input with debounce logic.

### Select Component

The Select component provides dropdown selection for filters and form options. The migration maintains the existing multi-select capabilities and keyboard navigation.

**Props Interface:**
```typescript
interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  multiple?: boolean;
  name?: string;
  className?: string;
}
```

**Implementation Strategy:**
The wrapper uses shadcn/ui's Select component which provides proper ARIA attributes and keyboard navigation. Multi-select functionality is implemented using the Select's native multi-select capability with custom rendering for selected items. The existing gray background and border styling is preserved through custom class overrides.

### Checkbox Component

The Checkbox component provides boolean selection with accessibility features. The migration preserves the existing checked state styling with #ED0577.

**Props Interface:**
```typescript
interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}
```

**Implementation Strategy:**
The wrapper uses shadcn/ui's Checkbox component with custom styling for the checked state. The #ED0577 color is applied to the checked indicator. Label association is maintained using the existing htmlFor pattern for proper screen reader support.

### Accordion Component

The Accordion component provides collapsible form sections with validation indicators. The migration preserves the smooth transition animations and keyboard navigation.

**Props Interface:**
```typescript
interface AccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
    error?: boolean;
    completed?: boolean;
  }>;
  defaultExpanded?: string | string[];
  onToggle?: (id: string) => void;
  type?: 'single' | 'multiple';
  className?: string;
}
```

**Implementation Strategy:**
The wrapper uses shadcn/ui's Accordion component which provides proper ARIA attributes and keyboard navigation. Validation indicators (error dots, completion dots) are rendered in the accordion header using custom icons. The smooth transition animations are implemented using CSS transitions on the accordion content.

### Pagination Component

The Pagination component provides navigation controls for large data sets. The migration preserves the page number display with ellipsis and keyboard navigation.

**Props Interface:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
  showItemsPerPage?: boolean;
  className?: string;
}
```

**Implementation Strategy:**
The wrapper uses shadcn/ui's Pagination component with custom rendering for page numbers and ellipsis. The showing info text (e.g., "Showing 1 to 20 of 100 orders") is rendered as a separate component. The active page styling uses #ED0577 background as specified.

### Badge Component

The Badge component provides status indicators with consistent color mapping. The migration preserves the existing color scheme and styling.

**Props Interface:**
```typescript
interface BadgeProps {
  variant: 'submitted' | 'waiting' | 'closed' | 'cancelled' | 'default';
  children: React.ReactNode;
  className?: string;
}
```

**Implementation Strategy:**
The wrapper uses shadcn/ui's Badge component with custom variant styling. Each variant maps to the specified color scheme (submitted: blue, waiting: amber, closed: green, cancelled: red). The styling includes rounded-full, px-2 py-0.5, and text-xs as specified.

### DropdownMenu Component

The DropdownMenu component provides user menu functionality with keyboard navigation. The migration preserves the existing user info display and logout option.

**Props Interface:**
```typescript
interface DropdownMenuProps {
  trigger: React.ReactNode;
  user?: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
  className?: string;
}
```

**Implementation Strategy:**
The wrapper uses shadcn/ui's DropdownMenu component which provides proper ARIA attributes and keyboard navigation. The user info and logout option are rendered as dropdown items. Click-outside-to-close behavior is handled by the Radix UI primitive.

### EmptyState Component

The EmptyState component provides consistent empty state messaging with variants for different scenarios. The migration preserves the existing icon styling and aria-live attributes.

**Props Interface:**
```typescript
interface EmptyStateProps {
  variant: 'orders' | 'outlets' | 'search' | 'offline' | 'error';
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
```

**Implementation Strategy:**
The wrapper uses shadcn/ui's EmptyState pattern with custom rendering for each variant. The default content for each variant is maintained through a content mapping function. Icons are rendered using the existing icon components with appropriate sizing. Aria-live attributes are preserved for screen reader announcements.

## Data Models

### Component Props Models

All component props are defined as TypeScript interfaces that maintain backward compatibility with existing usage. These interfaces are exported from the wrapper components and used throughout the application.

```typescript
// Common utility types
type ComponentClassName = string | undefined;
type EventHandler<T> = ((event: T) => void) | undefined;
type Nullable<T> = T | null | undefined;

// Order model for Card component
interface Order {
  id: string;
  invoiceNumber: string;
  status: 'submitted' | 'waiting' | 'closed' | 'cancelled';
  recipientName: string;
  recipientAddress: string;
  distance: string;
  serviceType: string;
  shippingFee: number;
  createdAt: Date;
  isOffline?: boolean;
  pendingSync?: boolean;
}
```

### Theme Configuration Model

The theme configuration defines CSS custom properties for consistent styling across all components. This model integrates shadcn/ui's CSS variable system with the existing color palette.

```typescript
interface ThemeConfig {
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    destructive: string;
    destructiveForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    border: string;
    input: string;
    ring: string;
    status: {
      submitted: string;
      waiting: string;
      closed: string;
      cancelled: string;
    };
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  spacing: {
    1: string;
    2: string;
    3: string;
    4: string;
    // ... etc
  };
}
```

### Migration Status Model

The migration status model tracks the progress of component migrations and provides a checklist for the migration process.

```typescript
interface MigrationStatus {
  component: string;
  phase: 1 | 2 | 3;
  status: 'pending' | 'in_progress' | 'completed' | 'deprecated';
  wrapperCreated: boolean;
  testsUpdated: boolean;
  docsUpdated: boolean;
  notes?: string;
}

interface MigrationChecklist {
  totalComponents: number;
  completedComponents: number;
  phases: {
    phase1: MigrationStatus[];
    phase2: MigrationStatus[];
    phase3: MigrationStatus[];
  };
}
```
## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Button Variant Consistency

*For any* button variant (primary, secondary, ghost, danger), the rendered button SHALL apply the correct styling classes and trigger the onClick handler when clicked.

**Validates: Requirements 2.1, 2.2**

### Property 2: Button Size Application

*For any* button size (sm, default, lg), the rendered button SHALL display the correct text size and padding as specified in the requirements.

**Validates: Requirements 2.3**

### Property 3: Card Status Badge Color Mapping

*For any* order with a status (submitted, waiting, closed, cancelled), the Card component SHALL render the badge with the correct color mapping.

**Validates: Requirements 3.3**

### Property 4: Card Responsive Design

*For any* viewport width, the Card component SHALL apply compact padding (p-3) on mobile and full padding (p-4) on larger screens.

**Validates: Requirements 3.4**

### Property 5: Dialog Accessibility Pattern

*For any* dialog instance, the rendered dialog SHALL include proper ARIA roles (dialog), focus trapping SHALL be active, and pressing escape SHALL close the dialog.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 6: Input Focus Ring Styling

*For any* input element that receives focus, the input SHALL display the #ED0577 focus ring with 2px offset and 2px blur.

**Validates: Requirements 5.2**

### Property 7: Input Error State Styling

*For any* input with an error message, the input SHALL display a red border and the error message SHALL be associated via aria-describedby.

**Validates: Requirements 5.3, 5.6**

### Property 8: Select Keyboard Navigation

*For any* select component, keyboard navigation using arrow keys and enter SHALL allow option selection and the escape key SHALL close the dropdown.

**Validates: Requirements 6.5**

### Property 9: Checkbox State and Accessibility

*For any* checkbox interaction, the checked state SHALL be visually indicated with #ED0577 and the label SHALL be properly associated for screen readers.

**Validates: Requirements 7.1, 7.2, 7.3, 7.5**

### Property 10: Accordion Toggle Behavior

*For any* accordion item, clicking the header SHALL toggle the expanded state and the transition SHALL animate smoothly.

**Validates: Requirements 8.2, 8.5**

### Property 11: Pagination Active Page Styling

*For any* pagination component with an active page, the active page button SHALL display the #ED0577 background color.

**Validates: Requirements 9.5**

### Property 12: Badge Color Mapping

*For any* badge with a variant (submitted, waiting, closed, cancelled), the rendered badge SHALL use the correct background and text color combination.

**Validates: Requirements 10.1, 10.4**

### Property 13: DropdownMenu Keyboard Navigation

*For any* dropdown menu, keyboard navigation using arrow keys SHALL navigate between items and escape SHALL close the menu.

**Validates: Requirements 11.4**

### Property 14: EmptyState Variant Content

*For any* empty state variant (orders, outlets, search, offline, error), the rendered empty state SHALL display the correct icon, title, and description.

**Validates: Requirements 12.1, 12.2, 12.3**

### Property 15: Wrapper API Compatibility

*For any* existing usage of migrated components, the wrapper components SHALL accept the same props and produce equivalent rendered output.

**Validates: Requirements 13.1, 13.2, 13.3**

### Property 16: Theme Color Application

*For any* interactive component, the primary color #ED0577 SHALL be applied to focus states, active states, and other interactive indicators.

**Validates: Requirements 14.1**

### Property 17: Accessibility Compliance

*For any* migrated component, the rendered component SHALL maintain WCAG 2.1 AA compliance including proper ARIA attributes, keyboard navigation, and color contrast.

**Validates: Requirements 15.1, 15.2, 15.3, 15.4, 15.5, 15.6**

### Property 18: Bundle Size Constraint

*For any* production build, the total bundle size SHALL NOT increase by more than 10% due to shadcn/ui dependencies.

**Validates: Requirements 20.1**

### Property 19: Dependency Installation

*For any* shadcn/ui initialization, the package.json SHALL contain all required dependencies: @radix-ui/react-*, class-variance-authority, clsx, tailwind-merge.

**Validates: Requirements 18.1**

### Property 20: Tree-Shaking Effectiveness

*For any* unused shadcn component, the component SHALL not be included in the production bundle.

**Validates: Requirements 20.3**

## Error Handling

### Component Error Boundaries

Each wrapper component is wrapped with the existing ErrorBoundary component to prevent component errors from breaking the entire application. The ErrorBoundary displays a user-friendly error message while maintaining the application's stability.

```typescript
// Error boundary wrapper pattern
<ErrorBoundary fallback={<ErrorFallback componentName="Button" />}>
  <ButtonWrapper {...props} />
</ErrorBoundary>
```

### Validation Error Handling

Form components (Input, Select, Checkbox) implement comprehensive validation error handling. Error messages are displayed below the input field and are associated with the input using aria-describedby for accessibility.

```typescript
// Error display pattern
{error && (
  <p id={`${name}-error`} className="text-red-500 text-sm mt-1" role="alert">
    {error}
  </p>
)}
```

### Loading State Handling

Components with async operations (Select loading options, Dialog fetching data) implement loading states that prevent user interaction and provide visual feedback. The loading state uses the existing loading spinner pattern.

### Fallback Strategies

When shadcn/ui components fail to render (due to missing dependencies or SSR issues), the wrapper components fall back to the original implementation. This fallback is implemented through a feature flag system that allows components to be rolled back individually.

```typescript
// Fallback pattern
const useShadcnComponents = process.env.NEXT_PUBLIC_USE_SHADCN === 'true';

export function Button(props: ButtonProps) {
  if (useShadcnComponents) {
    return <ShadcnButton {...props} />;
  }
  return <LegacyButton {...props} />;
}
```

## Testing Strategy

### Unit Testing Approach

Unit tests verify specific examples and edge cases for each migrated component. Tests focus on prop handling, rendering output, and interaction behavior. The existing test structure is maintained with updates to component selectors.

**Test Configuration:**
- Test runner: Jest with React Testing Library
- Minimum iterations: 100 for property-based tests
- Coverage threshold: 80% for migrated components
- Test tagging: Feature: upgrade-ui-components-shadcn, Property {number}: {property_text}

**Example Unit Test Structure:**
```typescript
describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders primary variant with correct classes', () => {
      render(<Button variant="primary">Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-[#ED0577]');
    });
    
    it('renders size variants correctly', () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-xs');
    });
  });
  
  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

### Property-Based Testing Approach

Property-based tests verify universal properties across all valid inputs. Each correctness property from the design document is implemented as a property-based test using a library appropriate for the language and framework.

**Property Test Configuration:**
- Library: fast-check or similar PBT library
- Minimum iterations: 100 per property
- Seeded runs for reproducibility
- Tagged with design property reference

**Example Property Test Structure:**
```typescript
import { fc, test } from '@fast-check/jest';

describe('Button Properties', () => {
  test('Property 1: Button Variant Consistency', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('primary'),
          fc.constant('secondary'),
          fc.constant('ghost'),
          fc.constant('danger')
        ),
        fc.boolean(),
        (variant, disabled) => {
          const { container } = render(
            <Button variant={variant} disabled={disabled}>
              Test
            </Button>
          );
          const button = container.querySelector('button');
          expect(button).not.toBeNull();
          if (disabled) {
            expect(button).toBeDisabled();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing Approach

Integration tests verify that migrated components work correctly within the application's context. These tests use the existing integration test infrastructure and focus on component interactions, data flow, and user workflows.

**Integration Test Focus Areas:**
- Form submission with migrated input components
- Order list rendering with migrated Card and Pagination components
- Dialog interactions in order creation and cancellation workflows
- Filter functionality with migrated Select components

### Visual Regression Testing

Visual regression tests verify that migrated components maintain the existing visual appearance. These tests use a screenshot-based approach with threshold comparisons to detect unintended visual changes.

**Visual Testing Configuration:**
- Tool: Chromatic or similar visual testing tool
- Threshold: 0.1% pixel difference
- Branch baseline: main branch
- Auto-approve threshold: 0.05% pixel difference

### Accessibility Testing

Accessibility tests verify WCAG 2.1 AA compliance for all migrated components. These tests use axe-core for automated accessibility testing and manual testing for aspects that require human evaluation.

**Accessibility Test Coverage:**
- ARIA attributes and roles
- Keyboard navigation
- Focus management
- Color contrast ratios
- Screen reader announcements

**Example Accessibility Test:**
```typescript
import { axe } from 'jest-axe';

describe('Button Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Test Execution Strategy

Tests are organized to enable selective execution based on migration phase and component. This approach allows focused testing during development and faster feedback loops.

**Test Execution Commands:**
```bash
# Run all tests with minimal verbosity
npm test -- --silent

# Run component-specific tests
npm test -- --testPathPattern="Button|Card|Dialog"

# Run property-based tests only
npm test -- --testNamePattern="Property"

# Run accessibility tests only
npm test -- --testNamePattern="accessibility"

# Run visual regression tests
npm test -- --testPathPattern="visual"
```

### Test Coverage Requirements

Each migrated component must meet the following coverage requirements:
- Statement coverage: 80%
- Branch coverage: 75%
- Function coverage: 85%
- Line coverage: 80%

Coverage reports are generated after each test run and tracked over time to identify coverage gaps and regression patterns.

### Performance Testing

Performance tests verify that migrated components meet the performance requirements. These tests measure rendering time, bundle size impact, and Core Web Vitals.

**Performance Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Bundle size increase: < 10%

Performance tests are run as part of the CI/CD pipeline and block deployment if metrics exceed thresholds.