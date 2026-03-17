/**
 * ItemsForm - Form section for adding items to order
 * Implements accessible form controls with proper labels and ARIA attributes
 */

import { Trash2, Plus } from 'lucide-react'

interface Item {
  id: string
  description: string
  quantity: number
}

interface ItemsFormProps {
  items: Item[]
  onAddItem: () => void
  onUpdateItem: (id: string, field: 'description' | 'quantity', value: string | number) => void
  onRemoveItem: (id: string) => void
}

export function ItemsForm({
  items,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: ItemsFormProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-sm text-gray-600">No items added yet</p>
      ) : (
        <div className="space-y-3" role="list" aria-label="Order items">
          {items.map((item, index) => (
            <div key={item.id} className="flex gap-3 items-end">
              <div className="flex-1">
                <label htmlFor={`item-description-${item.id}`} className="sr-only">
                  Item {index + 1} description
                </label>
                <input
                  id={`item-description-${item.id}`}
                  type="text"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm min-h-[44px]"
                  aria-label={`Item ${index + 1} description`}
                />
              </div>
              <div className="w-20">
                <label htmlFor={`item-quantity-${item.id}`} className="sr-only">
                  Item {index + 1} quantity
                </label>
                <input
                  id={`item-quantity-${item.id}`}
                  type="number"
                  placeholder="Qty"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm min-h-[44px]"
                  aria-label={`Item ${index + 1} quantity`}
                />
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Remove item ${index + 1}: ${item.description || 'unnamed item'}`}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onAddItem}
        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
        aria-label="Add new item to order"
      >
        <Plus size={18} aria-hidden="true" />
        Add Item
      </button>

      <p className="text-sm text-gray-600" aria-live="polite">
        Total items: <span className="font-medium">{totalItems}</span>
      </p>
    </div>
  )
}

export default ItemsForm
