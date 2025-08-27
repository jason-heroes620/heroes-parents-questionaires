import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

const Start = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <Button
                type="button"
                variant={"default"}
                size={"lg"}
                onClick={() => router.visit(route("survey"))}
            >
                Start
            </Button>
        </div>
    );
};

export default Start;
