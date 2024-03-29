import { Aside } from "../components/asideMenu/Aside"
import { AppRouter } from "../router/App";
import { useAppSelector } from "../store/store";

export const MainLayout = () => {

    const navigationParam = useAppSelector(state => state.navigationSlice.navigationParam);

    console.log(navigationParam)

    return (
        <div className="flex w-full h-screen overflow-y-hidden">
            <div className={`flex ${!navigationParam ? 'w-full md:w-96' : 'md:block hidden '}  md:w-96 border-r overflow-y-scroll`}>
                <Aside />
            </div>
            <div className={`flex ${navigationParam && 'w-full md:flex-1'} md:flex-1 overflow-y-scroll shadow`}>
                <AppRouter />
            </div>
        </div>
    )
}
