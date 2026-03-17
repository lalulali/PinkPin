import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ShippingFeeBreakdown from './ShippingFeeBreakdown'

describe('ShippingFeeBreakdown', () => {
  it('displays base fee, distance, rate, and total', () => {
    render(
      <ShippingFeeBreakdown
        distance={2.5}
        serviceType="standard"
        shippingFee={22500}
      />
    )

    expect(screen.getByText(/Shipping Fee Breakdown/i)).toBeInTheDocument()
    expect(screen.getByText(/Base Fee:/i)).toBeInTheDocument()
    expect(screen.getByText(/Distance:/i)).toBeInTheDocument()
    expect(screen.getByText(/Rate per km:/i)).toBeInTheDocument()
    expect(screen.getByText(/Total Shipping Fee:/i)).toBeInTheDocument()
  })

  it('formats currency correctly for standard service', () => {
    render(
      <ShippingFeeBreakdown
        distance={1.0}
        serviceType="standard"
        shippingFee={15000}
      />
    )

    // Base fee for standard: 10000 -> "10.000"
    const baseElements = screen.getAllByText(/Rp 10\.000/)
    expect(baseElements.length).toBeGreaterThan(0)
  })

  it('displays distance with 1 decimal place', () => {
    render(
      <ShippingFeeBreakdown
        distance={2.5}
        serviceType="standard"
        shippingFee={22500}
      />
    )

    const distanceElements = screen.getAllByText(/2\.5 km/)
    expect(distanceElements.length).toBeGreaterThan(0)
  })

  it('displays N/A when distance is null', () => {
    render(
      <ShippingFeeBreakdown
        distance={null}
        serviceType="standard"
        shippingFee={10000}
      />
    )

    expect(screen.getByText(/N\/A/)).toBeInTheDocument()
  })

  it('updates when service type changes', () => {
    const { rerender } = render(
      <ShippingFeeBreakdown
        distance={2.0}
        serviceType="standard"
        shippingFee={20000}
      />
    )

    // Standard: base 10000, rate 5000
    const standardBase = screen.getAllByText(/Rp 10\.000/)
    expect(standardBase.length).toBeGreaterThan(0)

    rerender(
      <ShippingFeeBreakdown
        distance={2.0}
        serviceType="express"
        shippingFee={35000}
      />
    )

    // Express: base 20000, rate 7500
    const expressBase = screen.getAllByText(/Rp 20\.000/)
    expect(expressBase.length).toBeGreaterThan(0)
  })

  it('displays calculation formula', () => {
    render(
      <ShippingFeeBreakdown
        distance={2.5}
        serviceType="standard"
        shippingFee={22500}
      />
    )

    expect(screen.getByText(/Formula:/i)).toBeInTheDocument()
    expect(screen.getByText(/Base Fee \+ \(Distance × Rate per km\)/)).toBeInTheDocument()
  })

  it('displays detailed calculation when distance is available', () => {
    render(
      <ShippingFeeBreakdown
        distance={2.5}
        serviceType="standard"
        shippingFee={22500}
      />
    )

    expect(screen.getByText(/Calculation:/i)).toBeInTheDocument()
  })

  it('handles express service type correctly', () => {
    render(
      <ShippingFeeBreakdown
        distance={1.5}
        serviceType="express"
        shippingFee={31250}
      />
    )

    // Express: base 20000, rate 7500
    const baseElements = screen.getAllByText(/Rp 20\.000/)
    expect(baseElements.length).toBeGreaterThan(0)
    const rateElements = screen.getAllByText(/Rp 7\.500/)
    expect(rateElements.length).toBeGreaterThan(0)
  })

  it('handles same-day service type correctly', () => {
    render(
      <ShippingFeeBreakdown
        distance={1.0}
        serviceType="same-day"
        shippingFee={40000}
      />
    )

    // Same-day: base 30000, rate 10000
    const baseElements = screen.getAllByText(/Rp 30\.000/)
    expect(baseElements.length).toBeGreaterThan(0)
    const rateElements = screen.getAllByText(/Rp 10\.000/)
    expect(rateElements.length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(
      <ShippingFeeBreakdown
        distance={2.0}
        serviceType="standard"
        shippingFee={20000}
        className="custom-class"
      />
    )

    const element = container.querySelector('.custom-class')
    expect(element).toBeInTheDocument()
  })

  it('displays distance charge calculation', () => {
    render(
      <ShippingFeeBreakdown
        distance={2.0}
        serviceType="standard"
        shippingFee={20000}
      />
    )

    expect(screen.getByText(/Distance Charge:/)).toBeInTheDocument()
    // Distance charge: 2.0 * 5000 = 10000
    const chargeElements = screen.getAllByText(/Rp 10\.000/)
    expect(chargeElements.length).toBeGreaterThan(0)
  })
})
