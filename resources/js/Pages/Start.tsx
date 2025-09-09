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

const Start = () => {
    return (
        <div className="flex w-full min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="mx-auto bg-white h-screen md:w-7xl">
                <div className="px-4 py-10 md:px-10 ">
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
                    <div className="py-6">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div>
                                <Card className="shadow-xl">
                                    <CardContent className="leading-relaxed text-justify">
                                        <span className="text-xl font-bold">
                                            B
                                        </span>
                                        ecause you don’t have to do it seorang
                                        diri, and when you feel supported, your
                                        kids shine better. Connect with parents
                                        who share your style, your values and
                                        your journey. While you discover your
                                        tribe, your child will embark on their
                                        own learning adventure - growing,
                                        exploring and thriving!
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="py-4">
                        <Button
                            type="button"
                            variant={"default"}
                            size={"lg"}
                            onClick={() => router.visit(route("survey"))}
                            className="bg-gradient-to-r from-[#cee5f8] to-[#b5cfe4] text-black opacity-80"
                        >
                            What's my clique?
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Start;
