import React from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const Page = () => {
    return (
        <>
            <section className={"card-cta"}>
                <div className={"flex flex-col gap-6 max-w-lg"}>
                    <h2>
                        Get Hired with AI-Powered Practice, Testing, and Feedback
                    </h2>
                    <p className={"text-lg"}>
                        Practice on real interview questions and get feedback from our AI-powered
                        interviewer. Test your skills and receive your ratings to apply for any of our
                        partnered companies.
                    </p>
                    <Button asChild className={"btn-primary max-sm:w-full"}>
                        <Link href={"/interview"}>Start An Interview</Link>
                    </Button>
                </div>

                <Image src={"/robot.png"} alt={"robot"} width={400} height={400} className={"max-sm:hidden"}/>
            </section>
            <section className={"flex flex-col gap-6 mt-8"}>
                <h2>
                    Your Interviews
                </h2>
                <div className={"interviews-section"}>
                    {
                        dummyInterviews.map((interview) => (
                            <InterviewCard key={interview.id} {... interview}/>
                        ))
                    }
                </div>
            </section>
            <section className={"flex flex-col gap-6 mt-8"}>
                <h2>
                    Take an Interview
                </h2>
                <div className={"interviews-section"}>
                    {
                        dummyInterviews.map((interview) => (
                            <InterviewCard key={interview.id} {... interview}/>
                        ))
                    }
                </div>
            </section>
        </>
    )
}
export default Page
