// Migration wrapper components for backward compatibility
// These wrappers adapt shadcn/ui components to existing component APIs
// TODO: Migrate to direct shadcn/ui usage after full migration

export { Button, type ButtonProps } from './Button'
export { Input, type InputProps } from './Input'
export { Card, type CardProps, type Order, statusColors } from './Card'
export { Badge, type BadgeProps, type BadgeVariant } from './Badge'
export { Dialog, type DialogProps, ConfirmationDialog, type ConfirmationDialogProps } from './Dialog'
export { Select, type SelectProps, type SelectOption, StatusSelect, ServiceTypeSelect, OutletSelect } from './Select'
export { Checkbox, type CheckboxProps, CheckboxGroup, type CheckboxGroupProps, TermsCheckbox } from './Checkbox'
export { DropdownMenu, type DropdownMenuProps, UserMenu, ActionMenu } from './DropdownMenu'
export { Accordion, type AccordionProps, type AccordionSection } from './Accordion'
export { Pagination, type PaginationProps } from './Pagination'
export { EmptyState, type EmptyStateProps, type EmptyStateVariant } from './EmptyState'