/**
 * RecipientInfo - Displays recipient information for an order
 * Shows name, phone, email, and address with clickable phone/email links
 * Implements Requirement 11.2
 * Uses proper semantic structure with description lists
 */

import { Recipient } from '@/src/types'

interface RecipientInfoProps {
  recipient: Recipient
}

export function RecipientInfo({ recipient }: RecipientInfoProps) {
  return (
    <article className="bg-white rounded-lg shadow p-6" aria-labelledby="recipient-info-title">
      <h2 id="recipient-info-title" className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h2>
      <dl className="space-y-4">
        <div>
          <dt className="text-sm text-gray-500">Name</dt>
          <dd className="font-medium text-gray-900">{recipient.name}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Phone</dt>
          <dd>
            <a
              href={`tel:${recipient.phone}`}
              className="font-medium text-[#ED0577] hover:text-[#d9066a]"
              aria-label={`Call ${recipient.name} at ${recipient.phone}`}
            >
              {recipient.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Email</dt>
          <dd>
            <a
              href={`mailto:${recipient.email}`}
              className="font-medium text-[#ED0577] hover:text-[#d9066a]"
              aria-label={`Email ${recipient.name} at ${recipient.email}`}
            >
              {recipient.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Address</dt>
          <dd className="font-medium text-gray-900">{recipient.address}</dd>
        </div>
      </dl>
    </article>
  )
}

export default RecipientInfo