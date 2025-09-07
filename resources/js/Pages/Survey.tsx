import React, { useState } from "react";
import axios from "axios";
import Result from "./Result";

interface Answer {
    id: number;
    text: string;
    weight?: number;
}

interface Question {
    id: number;
    text: string;
    answers: Answer[];
}

const Survey: React.FC = () => {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState({ name: "", email: "" });
    const [section1Responses, setSection1Responses] = useState<{
        [key: number]: number;
    }>({});
    const [category, setCategory] = useState("");
    const [section2Responses, setSection2Responses] = useState<{
        [key: number]: number;
    }>({});
    const [subCategory, setSubCategory] = useState("");
    const [section1Questions, setSection1Questions] = useState<Question[]>([]);
    const [section2Questions, setSection2Questions] = useState<Question[]>([]);

    const [categoryDescription, setCategoryDescription] = useState("");
    const [subCategoryDescription, setSubCategoryDescription] = useState("");

    // Load Section 1 questions
    React.useEffect(() => {
        if (step === 2 && section1Questions.length === 0) {
            axios.get(route("questions.section1")).then((res) => {
                console.log(res.data);
                setSection1Questions(res.data);
            });
        }
    }, [step, section1Questions.length]);

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const handleUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user.name && user.email) nextStep();
    };

    const handleSection1Change = (qid: number, aid: number) => {
        setSection1Responses((r) => ({ ...r, [qid]: aid }));
    };

    const submitSection1 = async () => {
        const responses = Object.keys(section1Responses).map((qid) => {
            const q = section1Questions.find((q) => q.id === +qid)!;
            const a = q.answers.find((a) => a.id === section1Responses[+qid])!;
            return { question_id: +qid, answer_id: a.id, weight: a.weight };
        });

        const res = await axios.post(route("submit.section1"), { responses });
        setCategory(res.data.category);
        nextStep();
    };

    React.useEffect(() => {
        if (step === 4 && category && section2Questions.length === 0) {
            axios.get(`/section2/${category}`).then((res) => {
                console.log(res.data);
                setSection2Questions(res.data);
            });
        }
    }, [step, category, section2Questions.length]);

    const handleSection2Change = (qid: number, aid: number) => {
        setSection2Responses((r) => ({ ...r, [qid]: aid }));
    };

    const submitSurvey = async () => {
        const responses2 = Object.keys(section2Responses).map((qid) => {
            const q = section2Questions.find((q) => q.id === +qid)!;
            const a = q.answers.find((a) => a.id === section2Responses[+qid])!;
            return { question_id: +qid, answer_id: a.id, weight: a.weight };
        });

        await axios
            .post(`/submit-survey/${category}`, {
                name: user.name,
                email: user.email,
                section1: Object.keys(section1Responses).map((qid) => ({
                    question_id: +qid,
                    answer_id: section1Responses[+qid],
                    weight: section1Questions
                        .find((q) => q.id === +qid)
                        ?.answers.find((a) => a.id === section1Responses[+qid])
                        ?.weight,
                })),
                category,
                section2: responses2,
            })
            .then((resp) => {
                setSubCategory(resp.data.subCategory);
                setCategoryDescription(resp.data.categoryDescription);
                setSubCategoryDescription(resp.data.subCategoryDescription);
            });

        nextStep();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Parenting Style Survey
                </h1>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${(step / 5) * 100}%` }}
                    ></div>
                </div>

                {step === 1 && (
                    <form onSubmit={handleUserSubmit} className="space-y-6">
                        <h2 className="text-xl font-semibold">
                            Your Information
                        </h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={user.name}
                            onChange={(e) =>
                                setUser((u) => ({ ...u, name: e.target.value }))
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) =>
                                setUser((u) => ({
                                    ...u,
                                    email: e.target.value,
                                }))
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                        >
                            Start Survey
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-6">
                            Section 1
                        </h2>
                        {section1Questions.map((q) => (
                            <div
                                key={q.id}
                                className="mb-6 p-5 border rounded-lg bg-gray-50"
                            >
                                <p className="font-medium text-gray-800 mb-3">
                                    {q.text}
                                </p>
                                <div className="space-y-2">
                                    {q.answers.map((a) => (
                                        <label
                                            key={a.id}
                                            className={`flex items-center p-2 border rounded cursor-pointer ${
                                                section1Responses[q.id] === a.id
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`q${q.id}`}
                                                checked={
                                                    section1Responses[q.id] ===
                                                    a.id
                                                }
                                                onChange={() =>
                                                    handleSection1Change(
                                                        q.id,
                                                        a.id
                                                    )
                                                }
                                                className="sr-only"
                                            />
                                            <span className="w-12 md:w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3">
                                                {section1Responses[q.id] ===
                                                    a.id && (
                                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                                )}
                                            </span>
                                            {a.text}{" "}
                                            {/* <span className="ml-auto text-sm text-gray-500">
                                                ({a.weight})
                                            </span> */}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2 border border-gray-300 rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={submitSection1}
                                disabled={
                                    Object.keys(section1Responses).length < 6
                                }
                                className="px-6 py-2 bg-green-600 disabled:bg-gray-400 text-white rounded-lg"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center">
                        {/* <h2 className="text-2xl font-bold text-blue-600">
                            Category: {category}
                        </h2> */}
                        {/* <p className="text-gray-600 mt-2">
                            Based on your responses
                        </p> */}
                        <p className="text-gray-600 mt-2">
                            You're almost complete!
                        </p>
                        <button
                            onClick={nextStep}
                            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg"
                        >
                            Continue to Section 2
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        {/* <h2 className="text-xl font-semibold mb-6">
                            Section 2: {category}
                        </h2> */}
                        {section2Questions.map((q) => (
                            <div key={q.id} className="mb-6">
                                <p className="font-medium text-gray-800 mb-3">
                                    {q.text}
                                </p>
                                <div className="space-y-2">
                                    {q.answers.map((a) => (
                                        <label
                                            key={a.id}
                                            className={`flex items-center p-3 border rounded cursor-pointer ${
                                                section2Responses[q.id] === a.id
                                                    ? "border-green-500 bg-green-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`q${q.id}`}
                                                checked={
                                                    section2Responses[q.id] ===
                                                    a.id
                                                }
                                                onChange={() =>
                                                    handleSection2Change(
                                                        q.id,
                                                        a.id
                                                    )
                                                }
                                                className="sr-only"
                                            />
                                            <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center mr-3">
                                                {section2Responses[q.id] ===
                                                    a.id && (
                                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                                )}
                                            </span>
                                            {a.text}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2 border border-gray-300 rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={submitSurvey}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                            >
                                Finish Survey
                            </button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <Result
                        category={category}
                        subCategory={subCategory}
                        categoryDescription={categoryDescription}
                        subCategoryDescription={subCategoryDescription}
                    />
                )}
            </div>
        </div>
    );
};

export default Survey;
