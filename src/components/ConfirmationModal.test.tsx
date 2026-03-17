/**
 * Tests for ConfirmationModal component
 * Tests order creation success confirmation display
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { ConfirmationModal } from './ConfirmationModal'

describe('ConfirmationModal', () => {
  it('should not render when isOpen is false', () => {
    const onClose = vi.fn()
    const { container } = render(
      <ConfirmationModal isOpen={false} orderId="ORD-123456" onClose={onClose} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should render when isOpen is true', () => {
    const onClose = vi.fn()
    render(
      <ConfirmationModal isOpen={true} orderId="ORD-123456" onClose={onClose} />
    )

    expect(screen.getByText('Order Created!')).toBeTruthy()
  })

  it('should display order ID', () => {
    const onClose = vi.fn()
    const orderId = 'ORD-1234567890'
    render(
      <ConfirmationModal isOpen={true} orderId={orderId} onClose={onClose} />
    )

    expect(screen.getByText(orderId)).toBeTruthy()
  })

  it('should display success message', () => {
    const onClose = vi.fn()
    render(
      <ConfirmationModal isOpen={true} orderId="ORD-123456" onClose={onClose} />
    )

    expect(screen.getByText('Your order has been successfully created.')).toBeTruthy()
  })

  it('should call onClose when Continue button is clicked', async () => {
    const onClose = vi.fn()
    render(
      <ConfirmationModal isOpen={true} orderId="ORD-123456" onClose={onClose} />
    )

    const continueButton = screen.getByText('Continue')
    fireEvent.click(continueButton)

    expect(onClose).toHaveBeenCalled()
  })

  it('should auto-close after 3 seconds', async () => {
    const onClose = vi.fn()
    render(
      <ConfirmationModal isOpen={true} orderId="ORD-123456" onClose={onClose} />
    )

    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalled()
      },
      { timeout: 3500 }
    )
  })

  it('should display auto-close message', () => {
    const onClose = vi.fn()
    render(
      <ConfirmationModal isOpen={true} orderId="ORD-123456" onClose={onClose} />
    )

    expect(screen.getByText('Redirecting in 3 seconds...')).toBeTruthy()
  })

  it('should display success icon', () => {
    const onClose = vi.fn()
    const { container } = render(
      <ConfirmationModal isOpen={true} orderId="ORD-123456" onClose={onClose} />
    )

    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })
})
