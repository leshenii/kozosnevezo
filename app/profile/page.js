'use client'

import {Button, Chip, Image, Spinner} from "@heroui/react";
import {useUser} from "@clerk/nextjs";

export default function ProfilePage() {

    const {isLoaded, user} = useUser()

    return (
        <div className="flex flex-col gap-8">
            <h1 className="mt-5 title text-center">Profilom</h1>
            {isLoaded && user ? (
                <>
                    <div className="flex flex-row gap-4">
                        <Image
                            alt="User profile photo"
                            src={user.imageUrl}
                            width={300}
                            radius="lg"
                        />
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2">
                                <Chip color="primary">Résztvevő</Chip>
                                <Chip color="secondary">Közös nevező tag</Chip>
                            </div>
                            <div className="text-left">
                                <p>Projekten részt vett: 4</p>
                                <p>Csapatvezető: <span className="underline">0</span></p>
                                <p className="underline">Visszajelzések</p>
                                <p className="underline">Személyes adatok</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-left">
                        <h2 className="kanit-semibold text-xl">Projekteken részt vett:</h2>
                    </div>
                </>
            ) : (
                <Spinner color="primary" size="lg"/>
            )}

        </div>
    );
}