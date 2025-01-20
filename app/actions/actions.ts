'use server';

import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { CampaingDto } from "../dto/campaing-dto";
import { SpotDto } from "../dto/spot-dto";
import { LoginFormSchema, LoginFormState } from "../lib/definitions";

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

export async function getActiveCampaing() : Promise<CampaingDto | undefined>{
    const activeCampaing = await db.campaing.findFirst({
        include:{
            spots: {
                orderBy:{
                    createdAt: 'asc'
                },
                include:{
                    points: true
                }
            }
        },
        where: {
            active: true
        },
    })

    if(!activeCampaing) return undefined;

    const columnsGrid = activeCampaing.columnsGrid;
    const rowsGrid = activeCampaing.rowsGrid;

    const spots:SpotDto[] = activeCampaing.spots.map(it => (
        {
            id: it.id,
            points: it.points.map(p => ({x: p.x, y:p.y}))
        }
    ))

    return { rows: rowsGrid, columns: columnsGrid, spots: spots }
}

export async function login(state:LoginFormState, formData:FormData){
    const validateFields = LoginFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    })

    if(!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const { username,password } = validateFields.data

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await db.user.findFirst({
        where:{
            username: username
        }
    })

    if(!user) return 

}