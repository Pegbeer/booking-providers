'use server';

import { PrismaClient } from "@prisma/client";
import { CampaingDto } from "../dto/campaing-dto";

const db = new PrismaClient()

export async function createCampaing(dto: CampaingDto) {
    return await db.$transaction(async (tx) => {
        const campaing = await tx.campaing.create({
            data: {
                columnsGrid: dto.columns,
                rowsGrid: dto.rows,
            }
        });

        for (let i = 0; i < dto.spots.length; i++) {
            const spot = await tx.spot.create({
                data: {
                    campaingId: campaing.id,
                    cost: 0.0,
                }
            })

            for (const point of dto.spots[i].points) {
                await tx.point.create({
                    data: {
                        x: point.x,
                        y: point.y,
                        spotId: spot.id
                    }
                })
            }
        }
        return campaing;
    });
}

export async function getActiveCampaing() : CampaingDto | undefined{
    const campaing = await db.campaing.findFirst({
        include:{
            spots: true
        },
        where: {
            active: true
        }
    })

    if(!campaing) return

    const spots = campaing.spots.

    return { columns: campaing.columnsGrid, rows: campaing.rowsGrid, spots: }
}