import React from "react";
import "./VisionSection.css";
import Title from "../Title/Title";

const VisionSection = () => {
  return (
    <section className="vision">
      <div className="vision__box">
        <p className="vision__text"> </p>

        <Title titleText={"visao"} color="white" classAdd="vision__text" />

        <p className="vision__text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium,
          aperiam. Ut accusamus eius adipisci beatae blanditiis alias assumenda.
          Totam ea aut ullam quasi amet deserunt eius similique porro, quos
          iusto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          nisi, hic dolores esse porro incidunt consectetur sit praesentium quas
          harum repudiandae totam, laudantium molestias facere! Culpa error
          velit odit et?
        </p>
      </div>
    </section>
  );
};

export default VisionSection;
