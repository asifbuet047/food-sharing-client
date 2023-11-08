import { Player } from '@lottiefiles/react-lottie-player'


function NoFoodPage() {
    return (
        <div>
            <Player autoplay loop src={'./nofood.json'} style={{ height: '400px', width: '400px' }}></Player>
        </div>
    )
}

export default NoFoodPage