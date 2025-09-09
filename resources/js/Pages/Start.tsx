import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const Start = () => {
    return (
        <div className="flex  min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="flex mx-auto bg-white h-screen md:w-7xl w-full">
                <div className="flex flex-col px-4 py-10 md:px-10 w-full">
                    <div className="flex flex-col gap-4">
                        <span className="font-raleway text-4xl">
                            Truth is,{" "}
                        </span>
                        <span className="font-raleway text-4xl">
                            every parent has style
                        </span>
                        <span className="font-raleway text-5xl font-bold">
                            Find your clique TODAY!
                        </span>
                    </div>
                    <div className="flex py-6">
                        <div className="flex md:grid md:grid-cols-3">
                            <Card className="shadow-xl flex md:col-span-1">
                                <CardContent className="leading-relaxed text-justify">
                                    <span className="text-xl font-bold">B</span>
                                    ecause you don’t have to do it seorang diri,
                                    and when you feel supported, your kids shine
                                    better. Connect with parents who share your
                                    style, your values and your journey. While
                                    you discover your tribe, your child will
                                    embark on their own learning adventure -
                                    growing, exploring and thriving!
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="flex justify-center py-4">
                        <Button
                            type="button"
                            variant={"default"}
                            size={"lg"}
                            onClick={() => router.visit(route("survey"))}
                            className="bg-gradient-to-r from-[#cee5f8] to-[#b5cfe4] text-black opacity-90 cursor-pointer border-4 hover:border-double hover:shadow-xl px-8 py-8"
                        >
                            What's my clique?
                        </Button>
                    </div>
                    <div className="py-8">
                        <div>
                            <span className="font-raleway text-2xl font-bold">
                                Upcoming Events
                            </span>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-row gap-8 p-4  overflow-x-auto">
                                <Card>
                                    <CardContent>
                                        <div className="flex flex-col space-y-3">
                                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[250px]" />
                                                <Skeleton className="h-4 w-[200px]" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <div className="flex flex-col space-y-3">
                                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[250px]" />
                                                <Skeleton className="h-4 w-[200px]" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <div className="flex flex-col space-y-3">
                                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[250px]" />
                                                <Skeleton className="h-4 w-[200px]" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Start;
