import { BeatLoader } from "react-spinners"

function ThreeCircleLoading({ circleSize }) {
    return (
        <div className='flex flex-row justify-center'>
            <BeatLoader size={circleSize} color='#FF02AB'></BeatLoader>
        </div>
    )
}

export default ThreeCircleLoading