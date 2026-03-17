/**
 * OutletSelection - Form section for selecting outlet
 * Displays outlet selector dropdown/list with outlet details
 * When an outlet is selected, the map is updated to center on that outlet
 */

import { Outlet } from '@/src/types'

interface OutletSelectionProps {
  outlets: Outlet[]
  selectedOutletId: string
  onChange: (outletId: string) => void
}

export function OutletSelection({
  outlets,
  selectedOutletId,
  onChange,
}: OutletSelectionProps) {
  const selectedOutlet = outlets.find((o) => o.id === selectedOutletId)

  return (
    <div className="space-y-4">
      {/* Outlet Selector Dropdown */}
      <div>
        <label htmlFor="outlet-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Outlet
        </label>
        <select
          id="outlet-select"
          value={selectedOutletId}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px]"
        >
          <option value="">Select an outlet</option>
          {outlets.map((outlet) => (
            <option key={outlet.id} value={outlet.id}>
              {outlet.name} - {outlet.address}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Outlet Details */}
      {selectedOutlet && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Outlet Name</p>
              <p className="text-sm font-semibold text-gray-900">{selectedOutlet.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Address</p>
              <p className="text-sm text-gray-700">{selectedOutlet.address}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Coordinates</p>
              <p className="text-sm text-gray-700">
                {selectedOutlet.coordinates.lat.toFixed(4)}, {selectedOutlet.coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-sm text-gray-600">
        Select the outlet from which this order will be shipped. The map will center on the selected outlet location.
      </p>
    </div>
  )
}

export default OutletSelection
