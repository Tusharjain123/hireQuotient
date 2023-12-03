import React, { useEffect, useState } from 'react'

const Table = () => {
    const [data, setData] = useState()
    const [input_text, setInput] = useState()
    const [filter, setFilter] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState()
    const [totalPage, setTotalPage] = useState()
    const [editable, setEditable] = useState(false)
    const itemsPerPage = 10;

    useEffect(() => {
        const get_data = async () => {
            const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            const json_resp = await response.json()
            const totalItems = json_resp.length;
            setTotalPage(Math.ceil(totalItems / itemsPerPage))
            setCurrentData(json_resp.slice(0, 10))
            setData(json_resp)
        }
        get_data()
    }, [data])
    useEffect(() => {
        if (currentPage >= 1 && currentPage <= totalPage) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const current = data && data.slice(startIndex, endIndex);
            setCurrentData(current)
        }
    }, [currentPage])

    function filterData(search) {
        if (search) {
            const query = search.toLowerCase().trim();
            setFilter(data.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(query)
                ))
            );
            setCurrentPage(1);
        }
    }
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



    return (
        <div className='w-[80%] m-auto my-16'>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                            <div className="py-3 px-4">
                                <div className="relative max-w-xs w-full border-gray-200 shadow-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none">
                                    <label className="sr-only">Search</label>
                                    <input type="text" name="hs-table-with-pagination-search" id="hs-table-with-pagination-search" className="py-2 px-3 ps-9 block w-[80%] text-sm " placeholder="Search for items" value={input_text} onChange={(e) => setInput(e.target.value)} />
                                    <div className='flex'>
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                        </div>
                                        <button className='absolute end-2 top-1 text-sm border p-1 bg-[#06b6d4] text-white rounded-md' onClick={() => filterData(input_text)}>Search</button>
                                        <button className='absolute end-[-15vw] top-1 text-sm border p-1 bg-[#06b6d4] text-white rounded-md' onClick={() => { setFilter(null); setInput("") }}>Clear Filter</button>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="py-3 px-4 pe-0">
                                                <div className="flex items-center h-5">
                                                    <input id="hs-table-pagination-checkbox-all" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                                    <label htmlFor="hs-table-pagination-checkbox-all" className="sr-only">Checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Role</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {filter ? filter.map((ele) => {
                                            return (
                                                <tr key={ele.id}>
                                                    <td className="py-3 ps-4">
                                                        <div className="flex items-center h-5">
                                                            <input id="hs-table-pagination-checkbox-1" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                                            <label htmlFor="hs-table-pagination-checkbox-1" className="sr-only">Checkbox</label>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ele.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele.role}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : currentData && currentData.map((ele) => {
                                            return (
                                                <tr key={ele.id}>
                                                    <td className="py-3 ps-4">
                                                        <div className="flex items-center h-5">
                                                            <input id="hs-table-pagination-checkbox-1" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                                            <label htmlFor="hs-table-pagination-checkbox-1" className="sr-only">Checkbox</label>
                                                        </div>
                                                    </td>
                                                    <td><input className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200" value={ele.name} disabled ={!editable}/></td>
                                                    <td><input className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200" value={ele.email} disabled={!editable}/></td>
                                                    <td><input className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200" type='text' value={ele.role} disabled={!editable}/></td>
                                                    <div className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={()=>setEditable(!editable)}>Edit/</button>
                                                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >Delete</button>
                                                    </div>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                            <div className="py-1 px-4">
                                <nav className="flex items-center space-x-1">
                                    <button type="button" onClick={() => { currentPage > 1 ? setCurrentPage(currentPage - 1) : null }} className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <span aria-hidden="true">«</span>
                                        <span className="sr-only">Previous</span>
                                    </button>
                                    <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10" aria-current="page">1</button>
                                    <div><input type='number' className='w-6' value={currentPage}/> of {totalPage}</div>
                                    
                                    <button type="button" onClick={() => { currentPage < totalPage ? setCurrentPage(currentPage + 1) : null }} className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">»</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
