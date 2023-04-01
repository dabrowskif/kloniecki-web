import React from "react";

interface ISectionProps {
  id: string;
  bgColor: string;
}

const Section = (props: ISectionProps) => {
  const { id, bgColor } = props;

  return (
    <section id={id} className={`py-20 ${bgColor}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"></div>
    </section>
  );
};

export default Section;
