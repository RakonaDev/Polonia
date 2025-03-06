'use client'
import { PieChart } from '@mui/x-charts/PieChart';
import { useUser } from "@clerk/nextjs"
import { BarChart } from '@mui/x-charts/BarChart';
import useUsers from '@/hook/useUsers';

const DatosProductos = [
  { id: 0, value: 20, label: 'IM-11031', color: 'black' },
  { id: 1, value: 30, label: 'IM-11052', color: 'orange' },
  { id: 2, value: 40, label: 'IM-11175', color: 'blue' },
  { id: 3, value: 55, label: 'IM-11580', color: 'green' },
  { id: 4, value: 80, label: 'IM-11385', color: 'red' },
]

export default function DashboardPage() {
  // const { data } = useUsers()
  return (
    <main className="mt-6 h-auto">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className='mt-10 flex gap-10'>
        <main className='lg:w-2/3 flex flex-col gap-5'>
          <div className='w-full flex flex-wrap'>
            {/*<div className='min-w-[300px] p-5 border-2 border-gray-300 shadow-md shadow-gray-400 rounded-lg'>
              <p>Usuario: {}</p>
              <div>
                
              </div>
            </div>
            <div className='min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md shadow-gray-400'>

            </div>
            <div className='min-w-[300px] p-5 border-2 border-gray-300 rounded-lg shadow-md shadow-gray-400'>

            </div>*/}
          </div>
          <div className='p-5 border-2 border-gray-300 rounded-lg shadow-md shadow-gray-400'>
            <h1 className='font-bold text-xl'>Ventas por Mes</h1>
            <BarChart
              className='w-full'
              xAxis={[{ scaleType: 'band', data: ['IM-11031', 'IM-11052', 'IM-11175'] }]}
              series={[{ data: [4, 0, 0] }, { data: [0, 1, 0] }, { data: [0, 0, 5] }]}
              width={800}
              height={300}
            />
          </div>
          <div className='p-5 border-2 border-gray-300 rounded-lg shadow-md shadow-gray-400'>
            <h1 className='text-xl font-bold'>Usuarios</h1>
            <table className='mt-10'>
              <thead className='w-full'>
                <tr className='grid-cols-12 grid gap-5 justify-evenly'>
                  <th className='col-span-2'>Nombre</th>
                  <th className='col-span-2'>Email</th>
                  <th className='col-span-2'>Role</th>
                  <th className='col-span-2'>Fecha Creacion</th>
                  <th className='col-span-3'>Fecha Modificacion</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        </main>
        <aside className='lg:w-1/3 flex flex-col gap-5 '>
          <div className='border-2 border-gray-300 rounded-lg p-5 shadow-md shadow-gray-400'>
            <h1 className='font-bold text-xl'>Ventas por Producto</h1>
            <PieChart
              series={[
                {
                  data: DatosProductos,
                },
              ]}
              width={400}
              height={200}
              className='mt-10'
            />
            <div className='mt-5'>
              <div className='grid grid-cols-12 gap-5 mb-5'>
                <div className='col-span-4 text-base text-center font-bold'>Color</div>
                <div className='col-span-4 text-base text-center font-bold'>Código Producto</div>
                <div className='col-span-4 text-base text-center font-bold'>Vendido</div>
              </div>
              {
                DatosProductos.map((producto, index) => (
                  <div key={index} className='grid grid-cols-12 gap-5 my-2 items-center'>
                    <div className='w-7 h-7 rounded-xl col-span-4 mx-auto' style={{ backgroundColor: producto.color }}></div>
                    <p className='text-sm col-span-4 text-center'>{producto.label}</p>
                    <p className='text-sm col-span-4 text-center'>{producto.value}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
