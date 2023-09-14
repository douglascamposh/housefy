
import { colorsShimer } from '@/app/constants/colors';

const ShimmerSubProperty=()=>{
    return  <div className='container mx-auto px-4 md:px-0  '>
    <div className={`h-10 w-[200px] md:w-[400px]  mb-2 ${colorsShimer.shimerColorGray}`}></div>
    <div className={`md:h-6 h-[100px] md:w-[400px] w-[250px] md:mx-20 mx-10 mb-2 bg-transparent}`}></div>

    <div className='flex flex-col md:flex-row'>
        <div className={`h-[200px] md:h-screen  w-full m-2 ${colorsShimer.shimerColorGray}`}></div>
        <div className={`h-[400px] md:h-screen w-full md:w-[800px] m-2 ${colorsShimer.shimerColorGray}`}></div>

        
    </div>
</div>
}

export default ShimmerSubProperty