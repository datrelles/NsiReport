
import producto1 from '../../assets/banners/1.png'
import producto2 from '../../assets/banners/2.png'
import producto3 from '../../assets/banners/3.png'
import { SlidingBanners } from './Banner'

function Home() {
    const Banners = [producto1, producto2, producto3]

    return (
        <>
            <div className="bg-primary text-white px-4 pt-4">
                <h1 className="text-3xl font-bold ">¡Bienvenido a NSI Reporteria!</h1>
                <p className="text-lg">Gestion Tecnologica Integral</p>
            </div>
            <div className="mt-4 mb-16">
                <SlidingBanners images={Banners} />
            </div>
        </>
    );
}
export default Home;