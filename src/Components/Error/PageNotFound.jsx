import { Player } from '@lottiefiles/react-lottie-player'

function PageNotFound() {
    return (
        <div className='w-full'>
            <Player autoplay loop src={'/assets/pageNotFound.json'} style={{ height: '400px', width: '400px' }}></Player>
        </div>
    )
}

export default PageNotFound