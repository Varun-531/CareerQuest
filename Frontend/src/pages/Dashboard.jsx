import React from "react";
import { Flame } from "lucide-react";
import Slider from "@/components/Slider";
import InternSlider from "@/components/InternSlider";
const Dashboard = () => {
  return (
    <div>
      <div className="h-[15vh] md:h-[30vh] flex items-center justify-center pt-5">
        <h1 className="text-center text-3xl md:text-5xl font-semibold italic text-slate-800 dark:text-slate-300">
          Make your <span className="text-sky-600">ideal career</span> come true
        </h1>
      </div>
      <h2 className="text-center text-xl font-semibold flex items-center gap-4 justify-center italic">
        Trending on Career Quest
        <img src="/fire.png" alt="flame" className="h-10" />
      </h2>
      <Slider className="py-10" />
      <section id="internships" className=" py-10">
        <h2 className="text-center text-xl font-semibold flex items-center gap-4 justify-center italic">
          Latest Internships in CareerQuest
        </h2>
        <InternSlider className="py-10" type="Internship" />
      </section>
      <section id="jobs" className="p-10">
        <h2 className="text-center text-2xl font-semibold flex items-center gap-4 justify-center italic">
          Latest Jobs in CareerQuest
        </h2>
        <InternSlider className="py-10" type="Job" />
      </section>
    </div>
  );
};

export default Dashboard;
