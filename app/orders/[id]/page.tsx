'use client'

export default function OrderDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div>
      <h1>Order Detail - {params.id}</h1>
      <p>Coming Soon</p>
    </div>
  )
}
