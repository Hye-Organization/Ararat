const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

export default function Table({head, body}) {
  return (
      <div className="flow-root overflow-auto">
        <div>
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-slate-800">
                <thead className="bg-slate-900">
                  <tr>
                    {head.map((h, ind) => {
                      return (
                        ind == 0 ?
                        <th scope="col" className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white ${ind == 0 ? "sm:pl-6" : ""}`}>
                        {h}
                      </th>
                      :   <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      {h}
                    </th>
                      )
                    })}
                   
                  
                
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-850">
                  {body.map((row) => {
                    return (
                      <tr key={row[1]}>
                      {row.map((r, ind) => {
                        return (
                          <>
                          {ind == 0 ?
<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                        {r}
                      </td>
                      : 
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{r}</td> 
                          }
                      </>                       )
                      })}
                    </tr>
                    )
                  })}
                   {/*  <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.title}</td>
                
                    </tr> */}
                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}
