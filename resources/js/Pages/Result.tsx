import BGHuman from "@/components/ui/bg-human";
import { Link } from "@inertiajs/react";
import { Pointer, Share, MousePointerClick } from "lucide-react";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

const Result = ({
    category,
    categoryDescription,
    subCategory,
    subCategoryDescription,
}) => {
    category = "Nurturer";
    subCategory = "Gentle Nurturer";
    categoryDescription = `You belong to the ${category} and your unique
                                strength shines as the ${subCategory}. ${subCategoryDescription.description}`;

    const shareUrl = "https://web.whatsapp.com";
    const shareTitle = "Check out my clique!";

    return (
        <div className={`bg-[#fbb6b1] w-full h-screen `}>
            <div className="flex mx-auto">
                <div className="absolute inset-0 z-0 w-full h-full flex justify-center items-center min-h-screen">
                    <BGHuman color1="#fbb6b1" color2={"#f89d95"} size={420} />
                </div>
                <div className="flex flex-col px-8 md:px-20 lg:px-40 xl:px-100 py-4 md:py-10 z-10">
                    <div>
                        <p className="mt-4">
                            <strong className="text-6xl font-amatic">
                                {subCategory}
                            </strong>
                        </p>
                        <p className="font-bold font-raleway text-3xl py-4">
                            {subCategoryDescription.title}
                        </p>
                        <div className="py-4">
                            <div
                                className="leading-relaxed descr font-raleway text-xl text-justify"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        categoryDescription.description || "",
                                }}
                            />
                        </div>
                        <div className="pt-10">
                            <p className="font-extrabold text-3xl font-amatic uppercase">
                                Your unique trait?
                            </p>
                        </div>
                        <div className="py-4">
                            <div
                                className="descr leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: subCategoryDescription?.trait || "",
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center md:flex-row md:justify-between">
                        <div className="flex justify-center py-4">
                            <Link
                                href={route("survey")}
                                className="flex flex-row gap-4 py-4"
                            >
                                <Pointer size={30} />
                                <span className="font-raleway text-xl">
                                    Do the test
                                </span>
                            </Link>
                        </div>
                        <div className="flex justify-center py-4">
                            <WhatsappShareButton
                                url={shareUrl}
                                title={shareTitle}
                                separator=" "
                                className="flex flex-row gap-4 py-4 items-center"
                            >
                                <WhatsappIcon size={36} round />
                                <span className="font-raleway text-xl">
                                    Share my clique!
                                </span>
                            </WhatsappShareButton>
                        </div>
                    </div>
                    <div className="flex flex-col py-4 md:grid md:grid-cols-3 md:gap-6 items-center static">
                        <div className="col-span-1 items-center justify-center relative px-4 py-4">
                            <Link href={"/"}>
                                <div className="flex flex-row items-center border border-black rounded-4xl py-2 justify-center px-2">
                                    <span className="uppercase font-bold text-2xl font-raleway">
                                        Learn More
                                    </span>
                                    <div className="">
                                        <MousePointerClick
                                            size={36}
                                            fill="#FFFFF"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-span-2">
                            <span className="font-raleway text-2xl">
                                Want to hang out with your clique while your
                                child learn?
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
