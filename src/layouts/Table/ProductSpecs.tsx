import React from "react";
import { Ispecs } from "../../Interfaces/Specs";

interface Props {
  specs: Ispecs[];
}

const ProductSpecs: React.FC<Props> = ({ specs }) => {
  if (!specs.length) {
    return <p>No hay especificaciones para este producto.</p>;
  }

  return (
    <div className="overflow-x-auto mb-5">
      <table className="w-full md:w-[800px] text-[12px] md:text-md rounded-xl shadow-md">
        <thead>
          <tr className="bg-primary-400 dark:bg-background-200 text-text-100 dark:text-text-900 text-left">
            <th className="p-3 ">Nombre</th>
            <th className="p-3 ">Valor</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-background-50 dark:bg-background-400" : "bg-background-0 dark:bg-background-300"
              } hover:bg-accent-100 dark:hover:bg-accent-100 transition-all`}
            >
              <td className="p-3 text-text-700">{spec.name}</td>
              <td className="p-3  text-text-700">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecs;
