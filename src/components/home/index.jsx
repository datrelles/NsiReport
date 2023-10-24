
import producto1 from '../../assets/banners/1.png'
import producto2 from '../../assets/banners/2.png'
import producto3 from '../../assets/banners/3.png'
import producto4 from '../../assets/banners/4.png'
import producto5 from '../../assets/banners/5.png'
import { SlidingBanners } from './Banner'

function Home() {
    const Banners = [producto1, producto2, producto3, producto4, producto5]

    return (
        <>
            <div className="bg-primary text-white px-4 pt-4">
                <h1 className="text-3xl font-bold ">¡Bienvenido a Prado dental!</h1>
                <p className="text-lg">Tu sonrisa es nuestra prioridad.</p>
            </div>
            <div className="mt-4 mb-16">
                <SlidingBanners images={Banners} />
            </div>
        </>
    );
}
export default Home;