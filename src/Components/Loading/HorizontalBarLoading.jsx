import { BarLoader } from "react-spinners"


function HorizontalBarLoading({ length }) {
    return (
        <div className='flex flex-row justify-center'>
            <BarLoader width={length} color='#FF02AB'></BarLoader>
        </div>
    )
}

export default HorizontalBarLoading