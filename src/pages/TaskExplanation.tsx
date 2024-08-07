import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const TaskExplanation = () => {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <div className="antialiased">
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="space-y-5 w-1/2">
                        <h1 className="text-center font-bold text-6xl">
                            Task Explanation
                        </h1>
                        <p className="text-center">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ducimus eveniet dolores delectus voluptas, sed doloribus ipsum, dolor reiciendis reprehenderit animi necessitatibus eaque atque magni? Quo rerum eveniet esse ipsa.
                        </p>
                        <p className='text-center text-2xl font-semibold'>Here a Small Assessment To
                            Know Your Awerness.</p>
                        <div className='w-full text-center'>
                            <Button onClick={() => navigate("/task-video")} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskExplanation
