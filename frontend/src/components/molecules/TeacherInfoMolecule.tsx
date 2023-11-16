import { useForm, useFieldArray } from "react-hook-form";
import { CgAddR, CgCloseR } from "react-icons/cg";
import useAuth from "../../hooks/useAuthHooks";
import Button from "../atoms/Button";
import { useSelector } from "react-redux/es/hooks/useSelector";

type FormValues = {
    educationalBackground: {
        university: string;
        major: string;
        cgpa: number;
    }[];
    teachingExperience: {
        institution: string;
        duration: string;
        description: string;
    }[];
};

export default function App() {
    const { teacherInfo } = useAuth()

    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            educationalBackground: [{ university: "", major: "", cgpa: 0 }],
            teachingExperience: [{ institution: "", duration: "", description: "" }]
        },
        mode: "onBlur"
    });

    const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
        name: "educationalBackground",
        control
    });

    const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
        name: "teachingExperience",
        control
    });

    const onSubmit = async (data: FormValues) => {
        console.log(data);
        await teacherInfo(data, checkString);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {eduFields.map((field, index) => (
                    <div key={field.id}>

                        <section className="section flex items-center space-x-2" key={field.id}>

                            <input
                                placeholder="University"
                                {...register(`educationalBackground.${index}.university` as const, {
                                    required: true
                                })}
                                className={`border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 ${errors?.educationalBackground?.[index]?.university ? "border-red-500" : ""}`}
                            />
                            <input
                                placeholder="Major"
                                {...register(`educationalBackground.${index}.major` as const, {
                                    required: true
                                })}
                                className={`border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 ${errors?.educationalBackground?.[index]?.major ? "border-red-500" : ""}`}
                            />
                            <input
                                placeholder="CGPA"
                                type="number"
                                {...register(`educationalBackground.${index}.cgpa` as const, {
                                    valueAsNumber: true,
                                    required: true
                                })}
                                className={`border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 ${errors?.educationalBackground?.[index]?.cgpa ? "border-red-500" : ""}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeEdu(index)}
                                className="text-red-500 hover:text-red-700 transition-all"
                            >
                                <CgCloseR className="text-xl" />
                            </button>
                        </section>
                    </div>
                ))}

                {expFields.map((field, index) => (
                    <div key={field.id}>

                        <section className="section flex items-center space-x-2" key={field.id}>

                            <input
                                placeholder="Institution"
                                {...register(`teachingExperience.${index}.institution` as const, {
                                    required: true
                                })}
                                className={`border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 ${errors?.teachingExperience?.[index]?.institution ? "border-red-500" : ""}`}
                            />
                            <input
                                placeholder="Duration"
                                {...register(`teachingExperience.${index}.duration` as const, {
                                    required: true
                                })}
                                className={`border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 ${errors?.teachingExperience?.[index]?.duration ? "border-red-500" : ""}`}
                            />
                            <input
                                placeholder="Description"
                                {...register(`teachingExperience.${index}.description` as const, {
                                    required: true
                                })}
                                className={`border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 ${errors?.teachingExperience?.[index]?.description ? "border-red-500" : ""}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeExp(index)}
                                className="text-red-500 hover:text-red-700 transition-all"
                            >
                                <CgCloseR className="text-xl" />
                            </button>
                        </section>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() =>
                        appendEdu({
                            university: "",
                            major: "",
                            cgpa: 0
                        })
                    }
                    className="px-3 py-1 rounded-md transition-all"
                >
                    <CgAddR className="text-xl" />
                    Add another educational background
                </button>
                <button
                    type="button"
                    onClick={() =>
                        appendExp({
                            institution: "",
                            duration: "",
                            description: ""
                        })
                    }
                    className="px-3 py-1 rounded-md transition-all"
                >
                    <CgAddR className="text-xl" />
                    Add another teaching experience
                </button>

                <Button type="submit" value="Submit" additionalStyles="bg-gray-500 hover:bg-gray-700 text-white font-bold w-30 mt-4" />

            </form>
        </div>
    );
}
