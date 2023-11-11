export const ParamsTable = ({label, text, classNameTD, colSpan, rowSpan}) => {
    return (
        <td className={`p-1 ${classNameTD}`} rowSpan={rowSpan} colSpan={colSpan} >
            <div className="">
                <h4 className='text-xs font-medium text-gray-900 align-top'>{label}</h4>
                <p className='text-sm mb-auto !min-h-[3ch]'>{text}</p>
            </div>
        </td>
    )
}


export const ParamsTableOptions = ({label, text, selectedOption, classNameTD, colSpan}) => {

    const options = ['Si', 'No', 'No Sé'];

    return (
        <>
            <td className={`gap-5 !border-nones p-1 ${classNameTD}`} colSpan={colSpan} >
                <h4 className=' text-xs font-medium text-gray-900'>{label}</h4>
                <p className='text-sm mb-auto'>{text}</p>
            </td>
            <td className='p-2 w-[10%]'>
                <div className='flex gap-2 justify-center items-center'>
                    {options.map((option, index) => (
                        <div key={index} className='flex flex-col items-center justify-between'>
                        <h6 className='text-xs'>{option}</h6>
                        <div className={`border w-4 h-4 text-xs flex items-center justify-center text-gray-700`}>{selectedOption === option.toLowerCase() ? 'X' : ''}</div>
                        </div>
                    ))}
                </div>
            </td>
        </>
    )
}

export const ParamsTableUniqueLine = ({label, text, classNameTD, colSpan, rowSpan}) => {
    return (
        <td className={`!border-none ${classNameTD}`} rowSpan={rowSpan} colSpan={colSpan} >
            <div className='flex flex-row w-full gap-2'>
                <h4 className='text-xs text-gray-900 font-semibold w-max'>{label}</h4>
                <p className='text-sm border-b border-gray-500 w-full text-gray-800 min-h-[3.5ch]'>{text}</p>
            </div>
        </td>
    )
}
