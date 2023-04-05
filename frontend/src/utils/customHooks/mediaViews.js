
import { useMediaQuery } from "react-responsive";


export const useMediaViews = () => {
        const mobileView = useMediaQuery({
            query: "(max-width: 539px)",
        });
        const tabletFloor = useMediaQuery({
            query: "(min-width: 539px)",
        });
        const tabletCeil = useMediaQuery({
            query: "(max-width: 1070px)",
        });
        const desktopView = useMediaQuery({
            query: "(min-width: 1070px)",
        });
        const tabletView = tabletFloor && tabletCeil;
        return [mobileView, tabletView, desktopView];
}
    


