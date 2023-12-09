import { Player } from '@lottiefiles/react-lottie-player'


function NoFoodPage() {
    return (
        <div className='flex flex-row justify-center items-center'>
            <Player autoplay loop src={'/assets/nofood.json'} style={{ height: '400px', width: '400px' }}></Player>
        </div>
    )
}

export default NoFoodPage