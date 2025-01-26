

export default async function Page ({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (
    <main className="mt-6">
      <h1 className="text-4xl font-bold">Producto</h1>
      <p>ID: {id}</p>
    </main>
  )
}