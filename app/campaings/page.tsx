import { getActiveCampaing } from "../actions/actions";
import GridSpotSelection from "@/components/ui/grid-spot-selection";

import EmptyCampaign from "@/components/ui/empty-campaing";

export default async function Page() {
    const activeCampaing = await getActiveCampaing();

    return (
        <div className="container mx-auto flex flex-col h-full p-4 gap-3">
            <h2 className="text-2xl font-semibold text-justify">Campaña activa</h2>
            <h4>Aqui puede seleccionar un spot de esta campaña para publicitarse</h4>

            {activeCampaing ?
                <GridSpotSelection campaing={activeCampaing} />
                : <EmptyCampaign />
            }
        </div>
    );
}